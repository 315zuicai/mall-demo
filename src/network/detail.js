import {request} from 'network/request';

export function getDetail(iid) {
  return request ({
    url: '/detail',
    // 注意params是一个对象
    params: {
      iid,
    }
  });
}

export function getRecommend() {
  return request ({
    url: '/recommend'
  });
}

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// const p = new Person('why', 19);

export class Goods {
    constructor(itmenInfo, columns, services) {
      this.title = itmenInfo.title;
      this.desc = itmenInfo.desc;
      this.newPrice = itmenInfo.price;
      this.oldPrice = itmenInfo.oldPrice;
      this.discount = itmenInfo.discountDesc;
      this.columns = columns;
      this.services =services;
      this.realPrice = itmenInfo.lowNowPrice;
    }
  }

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}