export class exchange{
	Rt: number;
	Ru: number;
	product_const: number;

	product_range: [number, number] = [1, 1000000000];
	Rt_range: [number, number] = [1, 100000000];
	Ru_range: [number, number] = [1, 100000000];

	private within_range( v: number, range: [number, number] ){
		return ( range[ 0 ] <= v && v <= range[ 1 ] );
	}

	constructor( Rt: number, Ru: number ){
		if( ! this.within_range( Rt, this.Rt_range ) ){
			throw Error( "Rt exceed valid range" );
		}else if( ! this.within_range( Ru, this.Ru_range ) ){
			throw Error( "Ru exceed valid range" );
		}else if( ! ( Rt <= ( this.product_range[ 1 ] / Ru ) ) ){
			throw Error( "product exceed valid range" );
		}else{
			this.Rt = Rt;
			this.Ru = Ru;
			this.product_const = this.Rt * this.Ru;
		}
	}

	increase_Rt( x: number ): number{
		if( ( x > 0 ) && ( x <= this.Rt_range[ 1 ] - this.Rt )){
			const y = this['product_const'] / (this['Rt'] + x) - this['Ru']
			this.Rt += x;
			this.Ru += y;
			return y;
		}else{
			throw Error( "Rt exceed valid range" );
		}
	}

	private increase_Ru( y: number ): number{
		if( ( y > 0 ) && ( y <= this.Ru_range[ 1 ] - this.Ru )){
			let new_Rt = this.product_const / ( this.Ru + y );
			if( new_Rt < this.Rt ){
				let delta = this.Rt - new_Rt;

				this.Ru += y;
				this.Rt = new_Rt;
				return delta;
			}else{
				throw Error( "Ru increase not enough" );
			}
		}else{
			throw Error( "Ru exceed valid range" );
		}
	}

	public reserve_state(): string{
		return( "TWD reserve: " + this.Rt + " , USD reserve: " + this.Ru );
	}

	public put_t( x: number ): string{
		try{
			let y = this.increase_Rt( x );	
			return( "put in " + x + " TWD, withdraw " + y + " USD");
		}catch( e ){
			return( "invalid operation" );
		}
	}

	public put_u( y: number ): string{
		try{
			let x = this.increase_Ru( y );
			return( "put in " + y + " USD, withdraw " + x + " TWD");
		}catch( e ){
			return( "invalid operation" );
		}
	}
}
