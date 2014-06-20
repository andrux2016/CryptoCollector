import json
import datetime
from functools import wraps

import requests
from django.db import models
from django.core.cache import cache

from coinkit import (BitcoinKeypair, PeercoinKeypair, LitecoinKeypair,
    DogecoinKeypair,FeathercoinKeypair)

class CryptoWallet(models.Model):
    """
    Base methods for all types of cryptocurrency wallets
    """
    owner = models.ForeignKey('auth.User')
    date_created = models.DateTimeField(default=datetime.datetime.now)
    name = models.TextField(max_length=64, blank=True)
    public_key = models.TextField()
    private_key = models.TextField(null=True, blank=True)

    def __unicode__(self):
        return "%s - %s" % (self.owner.username, self.public_key)

    def has_private_key(self):
        return bool(self.private_key)

    def price_json(self, currency='usd'):
        """
        Return a json encoded dict of price info. This data format is used for
        various things on the front end.
        """
        return json.dumps({
            'wallet_value': self.get_value(),
            'fiat_exchange': self.get_fiat_exchange(currency),
            'fiat_value': self.get_fiat_value(currency),
        })

    def js_id(self):
        """
        This is how the front end (javascript) identifies wallets.
        """
        return "%s-%s" % (self.symbol.lower(), self.pk)

    def get_fiat_value(self, currency='usd'):
        """
        Multiply a crypto amunt by the returned number to get the value of that
        crypto amount in local currency. For instance a bitcoin wallet with
        2.3 bitcoins can be converted to USD by:
        >>> btc = BitcoinWallet()
        >>> fiat_conversion = btc.get_fiat_value('usd')
        >>> 2.3 * fiat_conversion
        1894.4 # 2.3 bitcoins == 1894.4 USD
        """
        return self.get_value() * self.get_fiat_exchange(currency)

    def get_value(self):
        """
        Get the total amount of currency units that this wallet holds.
        Get from the blockchain. Either through an external service or
        through a locally running *coind
        """
        raise NotImplementedError()

    def send_to_address(self, address, amount):
        """
        Create a transaction of passed in amount to passed in address and send
        off to the coin network. Done either through an external service
        or through locally ran *coind.
        """
        raise NotImplementedError()

    def get_transactions(self):
        """
        Make a call to an external service and get all transactions for this
        address.
        """
        raise NotImplementedError()

    @classmethod
    def get_fiat_exchange(cls, currency='usd'):
        """
        Return the amount of units of currency per USD.
        Returned as a float. Not all subclasses may implement
        every curency.
        """
        raise NotImplementedError()

    @classmethod
    def generate_new_keypair(cls):
        raise NotImplementedError()

    class Meta:
        abstract = True


def bypassable_cache(func):
    """
    Cache decorator that caches the output of the function, but allows for the
    ability to bypass the cache by pasing in the 'bypass_cache' kwarg to be true.
    Also you can pass in 'hard_refresh' that will never read from cache, but
    will write it's output to cache.
    """
    @wraps(func)
    def lil_wayne(*args, **kwargs):
        hard_refresh = kwargs.pop('hard_refresh', False)
        bypass_cache = kwargs.pop('bypass_cache', False)

        key = '%s%s%s' % (func.__name__, str(args), str(kwargs))
        key = key.replace(' ', '') # to avoid bug in memcached

        if bypass_cache:
            #print "bypass", key
            return func(*args, **kwargs)

        if hard_refresh:
            ret = func(*args, **kwargs)
            cache.set(key, ret)
            #print "hard refresh", key
            return ret

        hit = cache.get(key)
        if hit is not None:
            #print "return hit", key
            return hit

        print "hitting because of a miss", key
        ret = func(*args, **kwargs)
        cache.set(key, ret)
        return ret
    return lil_wayne


class BitcoinWallet(CryptoWallet):
    symbol = 'BTC'
    full_name = 'Bitcoin'
    price_source = 'coinbase.com'

    @bypassable_cache
    def get_value(self):
        url = "http://blockchain.info/address/%s?format=json"
        response = requests.get(url  % self.public_key)
        return float(response.json()['final_balance']) * 1e-8

    @classmethod
    @bypassable_cache
    def get_fiat_exchange(cls, currency='usd'):
        response = requests.get("https://coinbase.com/api/v1/prices/spot_rate")
        return float(response.json()['amount'])

    @classmethod
    def generate_new_keypair(cls):
        keypair = BitcoinKeypair()
        return keypair.address(), keypair.private_key()

    def send_to_address(self, address, amount):
        """
        Make call to bitcoind through rpc.
        """
        raise NotImplementedError()

    @bypassable_cache
    def get_transactions(self):
        url = 'http://btc.blockr.io/api/v1/address/txs/' + self.public_key
        response = requests.get(url)
        return response.json()['data']['txs']


class LitecoinWallet(CryptoWallet):
    symbol = "LTC"
    full_name = 'Litecoin'
    price_source = "btc-e"

    @bypassable_cache
    def get_value(self):
        url = "http://ltc.blockr.io/api/v1/address/balance/"
        response = requests.get(url + self.public_key)
        return float(response.json()['data']['balance'])

    def send_to_address(self, address, amount):
        raise NotImplementedError()

    @classmethod
    @bypassable_cache
    def get_fiat_exchange(cls, currency='usd'):
        url = "https://btc-e.com/api/2/ltc_%s/ticker" % currency
        response = requests.get(url)
        return float(response.json()['ticker']['avg'])

    @classmethod
    def generate_new_keypair(cls):
        keypair = LitecoinKeypair()
        return keypair.address(), keypair.private_key()


class DogecoinWallet(CryptoWallet):
    symbol = "DOGE"
    full_name = 'Dogecoin'
    price_source = 'dogeapi.com'

    @bypassable_cache
    def get_value(self):
        url = "https://dogechain.info/chain/Dogecoin/q/addressbalance/"
        response = requests.get(url + self.public_key)
        return float(response.content)

    @classmethod
    @bypassable_cache
    def get_fiat_exchange(cls, currency='usd'):
        url = "https://www.dogeapi.com/wow/v2/?a=get_current_price&convert_to=USD&amount_doge=1"
        response = requests.get(url)
        return float(response.json()['data']['amount'])

    def send_to_address(self, address, amount):
        raise NotImplementedError()

    @classmethod
    def generate_new_keypair(cls):
        keypair = DogecoinKeypair()
        return keypair.address(), keypair.private_key()


class PeercoinWallet(CryptoWallet):
    symbol = "PPC"
    full_name = 'Peercoin'
    price_source = 'btc-e'

    @bypassable_cache
    def get_value(self):
        url = "http://ppc.blockr.io/api/v1/address/balance/"
        response = requests.get(url + self.public_key)
        return float(response.json()['data']['balance'])

    def send_to_address(self, address, amount):
        raise NotImplementedError()

    @classmethod
    @bypassable_cache
    def get_fiat_exchange(cls, currency='usd'):
        url = "http://ppc.blockr.io/api/v1/coin/info"
        response = requests.get(url)
        btce = float(response.json()['data']['markets']['btce']['value'])

        url = 'http://ppc.blockr.io/api/v1/exchangerate/current'
        response = requests.get(url)
        btc = float(response.json()['data'][0]['rates']['BTC'])

        return btce * (1 / btc )

    @classmethod
    def generate_new_keypair(cls):
        keypair = PeercoinKeypair()
        return keypair.address(), keypair.private_key()


class FeathercoinWallet(CryptoWallet):
    symbol = 'FTC'
    full_name = 'Feathercoin'
    price_source = 'api.feathercoin.com'

    @bypassable_cache
    def get_value(self):
        url= "http://api.feathercoin.com/?output=balance&address=%s&json=1" % self.public_key
        print url
        response = requests.get(url)
        try:
            return float(response.json()['balance'])
        except:
            return 0

    @classmethod
    @bypassable_cache
    def get_fiat_exchange(cls, currency='usd'):
        url="http://api.feathercoin.com/?output=usd&amount=1&json=1"
        response = requests.get(url)
        return float(response.json()[currency])

    @classmethod
    def generate_new_keypair(cls):
        keypair = FeathercoinKeypair()
        return keypair.address(), keypair.private_key()


class VertcoinWallet(CryptoWallet):
    symbol = 'VTC'
    full_name = 'Vertcoin'
    price_source = 'cryptocoincharts.info'

    @bypassable_cache
    def get_value(self):
        url = "https://explorer.vertcoin.org/chain/Vertcoin/q/addressbalance/"
        response = requests.get(url + self.public_key)
        return float(response.content)

    @classmethod
    @bypassable_cache
    def get_fiat_exchange(cls, currency='usd'):
        url="http://www.cryptocoincharts.info/v2/api/tradingPair/vtc_%s"
        response = requests.get(url % currency)
        return float(response.json()['price'])


class NextWallet(CryptoWallet):
    symbol = 'NXT'
    full_name = 'Next'
    price_source = 'cryptocoincharts.info'

    @bypassable_cache
    def get_value(self):
        url='http://nxtportal.org/nxt?requestType=getAccount&account='
        response = requests.get(url + self.public_key)
        return float(response.json()['balanceNQT']) * 1e-8

    @classmethod
    @bypassable_cache
    def get_fiat_exchange(cls, currency='usd'):
        url="http://www.cryptocoincharts.info/v2/api/tradingPair/nxt_%s"
        response = requests.get(url % currency)
        return float(response.json()['price'])


wallet_classes = {
    'btc': BitcoinWallet,
    'ltc': LitecoinWallet,
    'ppc': PeercoinWallet,
    'nxt': NextWallet,
    'ftc': FeathercoinWallet,
    'vtc': VertcoinWallet,
    'doge': DogecoinWallet,
}