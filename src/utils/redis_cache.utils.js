const redis = require("redis");
const { promisify } = require("util");
let { REDIS_PORT, REDIS_HOST, CACHE_EXPIRE, NODE_ENV } = require("../configs/app.configs");

if (NODE_ENV === "production") {
  REDIS_HOST = "redis";
}

class RedisCache {
  constructor() {
    this.client = redis
      .createClient(REDIS_PORT, REDIS_HOST)
      .on("connect", () => console.log("Connected to Redis"));
  }

  async getCache(key) {
    const getCacheAsync = promisify(this.client.get).bind(this.client);
    const data = await getCacheAsync(key);
    return data;
  }

  setCache(key, value) {
    this.client.setex(key, CACHE_EXPIRE, value);
  }

  delCache(key) {
    this.client.del(key);
  }

  delCacheMatch(regex) {
    this.client.keys("*", (err, _keys) => {
      // console.log(regex);
      const keys = _keys.filter((key) => new RegExp(regex, "g").test(key));
      keys.forEach((key) => {
        this.client.del(key);
      });
    });
  }
}

module.exports.RedisCache = new RedisCache();
