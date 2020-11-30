import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';

it('Should render without errors', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toMatchSnapshot();
});
