namespace $.$$ {

	export class $mol_book2 extends $.$mol_book2 {
		
		title() {
			return this.pages().map( page => {
				try {
					return page?.title()
				} catch( error ) {
					$mol_fail_log( error )
				}
			} ).reverse().filter( Boolean ).join( ' | ' )
		}

		@ $mol_mem
		sub() {
			
			const next = [  ... this.pages(), this.Placeholder() ]
			
			const prev = $mol_mem_cached( ()=> this.sub() ) ?? []
			
			for( let i = 1 ; i++ ; ) {
				
				const p = prev[ prev.length - i ]
				const n = next[ next.length - i ]
				
				if( !n ) break

				if( p === n ) continue

				n.bring()
				
				break

			}

			return next as readonly $mol_view[]
		}
		
		bring() {
			
			const pages = this.pages()
			
			if( pages.length ) pages[ pages.length - 1 ].bring()
			else super.bring()
			
		}

	}

}
