import { FETCH_PRODUCTS } from '../constants/types'
import ObjectUtil from '../../../utils/ObjectUtil'

export const fetchProducts = ({ commit }) => {
  const product = {
    id: ObjectUtil.generateObjectId(),
    pictures: ['http://7xlyg7.com1.z0.glb.clouddn.com/583ed546315c1e0056e1cfeb.png'],
    name: '小米 5S',
    brief: '"暗夜之眼"超感光相机 / 无孔式超声波指纹识别 / 骁龙 821 旗舰处理器 / 全金属一体化机身',
    price: 1899
  }

  const products = []
  const count = Math.ceil(Math.random() * 20);
  for (let i = 0; i < count; i++) {
    products.push({
      ...product,
      isMultiPrice: Math.random() > 0.5
    })
  }
  commit(FETCH_PRODUCTS, { products })
}
