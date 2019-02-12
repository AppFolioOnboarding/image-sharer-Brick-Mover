/* eslint-env mocha */
import 'jsdom-global/register';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Footer from '../../components/Footer';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  it('footer is centered and has font size 10px', () => {
    const wrapper = shallow(<Footer copyright={'footer'} />);

    expect(wrapper.find('div').hasClass('text-center')).to.equal(true);
    expect(wrapper.find('p').prop('style')).to.deep.equal({ fontSize: 10 });
  });
});
