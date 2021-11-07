namespace $ {

	/**
	 * Collects subscribers in compact array. 24B
	 * Use `$mol_wire_auto?.promo( pub )` to auto wire.
	 */
	export class $mol_wire_pub extends Array< $mol_wire_pub | number > {
		
		// Derived objects should be Arrays.
		static get [ Symbol.species ]() {
			return Array
		}
		
		protected subs_from = 0 // 4B
		
		/**
		 * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
		 */
		on( sub: $mol_wire_pub, sub_pos: number ) {
			const pos = this.length
			this.push( sub, sub_pos )
			return pos
		}
		
		/**
		 * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
		 */
		off( sub_pos: number ) {
			
			if(!( sub_pos < this.length )) {
				$mol_fail( new Error( `Wrong pos ${ sub_pos }` ) )
			}
			
			const end = this.length - 2
			if( sub_pos !== end ) {
				this.move( end, sub_pos )
			}
			
			this.pop()
			this.pop()
		}
		
		/**
		 * Autowire this publisher with current subscriber.
		 **/
		promo() {
			$mol_wire?.next( this )
		}
		
		/**
		 * Enforce lazy emitting.
		 */
		touch() {
			this.absorb()
		}
		
		/**
		 * Notify subscribers about self changes.
		 */
		emit() {
			for( let i = this.subs_from; i < this.length; i += 2 ) {
				;( this[i] as $mol_wire_pub ).absorb()
			}
		}
		
		/**
		 * Receive notification about publisher changes.
		 */
		absorb() {
			
			if( !this.affect( $mol_wire_stale ) ) return false
			
			while( $mol_wire_queue.length ) {
				const next = $mol_wire_queue.pop()!
				next.affect( $mol_wire_doubt )
			}
			
			return true
		}
		
		/**
		 * Add self subscribers to affection queue.
		 */
		affect( quant: number ) {
			for( let i = this.subs_from; i < this.length; i += 2 ) {
				$mol_wire_queue.push( this[i] as $mol_wire_sub )
			}
			return true
		}
		
		/**
		 * Moves peer from one position to another. Doesn't clear data at old position!
		 */
		move( from_pos: number, to_pos: number ) {
			
			const peer = this[ from_pos ] as $mol_wire_pub
			const self_pos = this[ from_pos + 1 ] as number
			
			this[ to_pos ] = peer
			this[ to_pos + 1 ] = self_pos
			
			peer.repos( self_pos, to_pos )
		}
		
		/**
		 * Updates self position in the peer.
		 */
		repos( peer_pos: number, self_pos: number ) {
			this[ peer_pos + 1 ] = self_pos
		}
		
	}
	
}
