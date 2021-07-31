import { doPost } from './request.js'

export function addShop (data) {
  return doPost('/shop/saveOrUpdate', data)
}

//  查审批状态
export function getApproveInfo () {
  return doPost('/shop/getApproveInfoByUserId')
}

// ==================================配送模块
export function getDispatchList (data) {
  return doPost('/shopDelivery/getAllShopDeliveryList', data)
}
// 新增派送
export function addDisapatch (data) {
  return doPost('/shopDelivery/insert', data)
}

// 删除派送
export function deleteDispatch (data) {
  return doPost('/shopDelivery/deleteShopDeliveryInfoById', data)
}

// 更新派送
export function updateDispatch (data) {
  return doPost('/shopDelivery/update', data)
}


// ==================================产品模块
export function getShopProductList (data) {
  return doPost('/shopProduct/getShopProductList', data)
}

// 上下架产品

export function upOrDownProduct (id, isEnable) {
  return doPost('/shopProduct/operatorShopProductStatus', { id, isEnable })
}


// ==================================商品模块
export function getShopGoodsList (data) {
  return doPost('/shopGoods/pageQuery', data)
}

export function upOrDownGoods (idList, isEnable) {
  return doPost('/shopGoods/operatorGoodsStatus', { idList, isEnable })
}

// 查询商品详情
export function getGoodsById (id) {
  return doPost('/prdGoods/getGoodsById', { id })
}


// 添加店铺商品
export function addShopGoods (data) {
  return doPost('/shopGoods/insert', data)
}

// ============================商品列表总库
export function getGoodsList (data) {
  return doPost('/prdGoods/pageQuery', data)
}

// ============================获取附近门店
export function getNearShopList (data) {
  return doPost('/shop/nearShopList', data)
}

// 获取店铺详情
export function getShopInfo (shopId) {
  return doPost('/shop/getById', { shopId })
}
