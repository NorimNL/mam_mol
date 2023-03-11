namespace $ {
	$mol_test({
		'Parse no pair' () { $mol_assert_unique( $mol_cookie.parse(''), {} ) } ,
		'Parse one pair' () { $mol_assert_like( $mol_cookie.parse('csrftoken=to0123ken'), {'csrftoken':'to0123ken'} ) } ,
		'Parse two pair' () { $mol_assert_like( $mol_cookie.parse('csrftoken=to0123ken; _yasc=AaBbCc='), {'csrftoken':'to0123ken', '_yasc': 'AaBbCc='} ) } ,
		'Parse three pair' () { $mol_assert_like( $mol_cookie.parse('csrftoken=to0123ken; user=user; yandexuid=12345'), {'csrftoken':'to0123ken', 'user':'user', 'yandexuid':'12345'} ) } ,

		'Compose no pair' () { $mol_assert_equal( $mol_cookie.compose( {} ), '' ) } ,
		'Compose one pair' () { $mol_assert_like( $mol_cookie.compose( { 'csrftoken':'to0123ken' } ), 'csrftoken=to0123ken' ) } ,
		'Compose two pair' () { $mol_assert_like( $mol_cookie.compose( { 'csrftoken':'to0123ken', '_yasc':'AaBbCc=' } ), 'csrftoken=to0123ken; _yasc=AaBbCc=' ) } ,
		'Compose three pair' () { $mol_assert_like( $mol_cookie.compose( { 'csrftoken':'to0123ken', 'user':'user', 'yandexuid':'12345'} ), 'csrftoken=to0123ken; user=user; yandexuid=12345' ) } ,
	})
}
