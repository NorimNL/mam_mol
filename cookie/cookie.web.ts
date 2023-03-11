namespace $ {

	export class $mol_cookie extends $mol_object2 {

		@ $mol_mem
		static all() : { [key: string]: string } {
			$mol_wire_watch()
			return this.parse( $mol_dom_context.document.cookie );
		}

		static set( cookie: { [ key: string ]: string } ): string {
			return $mol_dom_context.document.cookie = this.compose( cookie );
		}

		static parse( cookie: string ): { [ key: string ]: string} {
			return Object.fromEntries( cookie.split(/; ?/g).map( s => ( s.match( /^(.*?)=(.*)$/ ) ?? [] ).slice( 1 ) ) );
		}

		static compose( cookie: { [ key: string ]: string } ): string {
			return Object.keys( cookie ).map( key => key + '=' + cookie[key] ).join('; ');
		}

	}

}
