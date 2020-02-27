import { exchange } from './exchange';

let state: number = 0;
let state_msg =
	["Please enter initial Rt and Ru: ",
	 "Put in which currency?( twd[1] / usd[2] )",
	 "How much in TWD? ",
	 "How much in USD? "];
var stdin = process.openStdin();
let ex: exchange;

console.log( state_msg[ state ] );

stdin.addListener("data", function(d) {
	let s = d.toString().trim();
	if( state == 0 ){
		let arr = s.split( " ", 2 );
		try{
			if( arr.length != 2 ){ throw Error(); }
			else{
				console.log( Number( arr[ 0 ]), Number( arr[1]));
				ex = new exchange( Number( arr[0] ), Number( arr[ 1 ]) );
				state = 1;
				console.log( ex.reserve_state() );
			}
		}catch(e){
			console.log( "invalid arguments" )
		}
	}else if( state == 1 ){
		let arr = s.split( " ", 1 );
		try{
			if( arr.length != 1 ){ throw Error(); }
			else{
				let c = Number( arr[ 0 ] );
				if( c == 1 ){
					state = 2;
				}else if( c == 2 ){
					state = 3;
				}else{
					throw Error();
				}
			}
		}catch(e){
			console.log( "invalid arguments" )
		}
	}else if( state == 2 ){
		let arr = s.split( " ", 1 );
		try{
			if( arr.length != 1 ){ throw Error(); }
			else{
				let m = Number( arr[ 0 ] );
				console.log( ex.put_t( m ) );
				console.log( ex.reserve_state() );
				state = 1;
			}
		}catch(e){
			console.log( "invalid arguments" )
		}
	}else if( state == 3 ){
		let arr = s.split( " ", 1 );
		try{
			if( arr.length != 1 ){ throw Error(); }
			else{
				let m = Number( arr[ 0 ] );
				console.log( ex.put_u( m ) );
				console.log( ex.reserve_state() );
				state = 1;
			}
		}catch(e){
			console.log( "invalid arguments" )
		}
	}

	console.log( state_msg[ state ] );
});
