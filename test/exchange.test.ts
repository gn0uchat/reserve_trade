import { exchange } from '../exchange';
import { expect } from 'chai';
import 'mocha';

describe('exchange class', () => {
	it( 'invalid initial Rt as 0', () => {
		expect( () => new exchange( 0, 10000 ) ).to.throw();
	});
	it( 'invalid initial Ru as 0', () => {
		expect( () => new exchange( 1000, 0 ) ).to.throw();
	});
	it('put 6000 twd should get 375 usd', () => {
		let ex = new exchange( 10000, 1000 );
		expect(ex.increase_Rt( 6000 ) ).to.equal( -375 );
	});
});
