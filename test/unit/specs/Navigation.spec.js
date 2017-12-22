import { shallow } from 'vue-test-utils'
import Navigation from '@/components/Navigation'

describe('Navigation.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallow(Navigation)
    console.log(wrapper.html())
    expect(wrapper.contains('router-link')).toBeTruthy()
  })
})
