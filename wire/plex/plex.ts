namespace $ {
	
	export function $mol_wire_plex< Args extends [ any, ... any[] ] >(
		host: object,
		field: string,
		descr?: TypedPropertyDescriptor< ( ... args: Args )=> any >
	) {

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( host , field )
		const orig = descr?.value! ?? host[ field ]
		
		const sup = Reflect.getPrototypeOf( host )!
		if( typeof sup[ field ] === 'function' ) {
			Object.defineProperty( orig , 'name' , { value : sup[ field ].name } )
		}
		
		const descr2 = {
			... descr,
			value: function( this: typeof host, ... args: Args ) {
			
				let atom = $mol_wire_atom.plex( this, orig, args[0] )
				
				if(( args.length === 1 )||( args[1] === undefined )) {
					
					if( !$mol_wire_fiber.warm ) return atom.result()
					
					if( $mol_wire_auto() instanceof $mol_wire_task ) {
						return atom.once()
					} else {
						return atom.sync()
					}
					
				}
				
				return atom.resync( args )	
			}
		}
		
		Reflect.defineProperty( descr2.value , 'name' , { value : orig.name + ' ' } )
		Object.assign( descr2.value, { orig } )
		
		Reflect.defineProperty( host, field, descr2 )
		
		return descr2
	}
	
}
