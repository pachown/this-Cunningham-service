import React from 'react';
import { shallow, mount } from 'enzyme';
import data from './mockData';
import Tickets from '../../src/components/Tickets.jsx';

describe('<Tickets />', () => {
  let tickets;
  beforeEach(() => {
    tickets = shallow(<Tickets current={data} />);
  });
  test('Tickets should render based on props', () => {
    expect(tickets.find('.ticket-header').text()).toEqual('Sukhothai Old City Entrance Tickets');
    expect(tickets.find('.ticket-price').text()).toEqual('from $238');
    tickets.setProps({ current: { ...data, attractionTitle: 'Test Attraction', ticketPrice: 500 } });
    expect(tickets.find('.ticket-header').text()).toEqual('Test Attraction Entrance Tickets');
    expect(tickets.find('.ticket-price').text()).toEqual('from $500');
  });
});
