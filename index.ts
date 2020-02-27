import { exchange } from './exchange';

let ex = new exchange( 10000, 1000 );

console.log( ex.put_t( 6000 ) );
console.log( ex.reserve_state() );
