# $mol_cookie

Provide get and set methods for `document.cookie`.
Provide `parse` and `compose` methods for convert cookie string to dict and reverse.

## Usage example

```typescript
namespace $ {
	// get value from cookie
	const cookie = $mol_cookie.all()
	const csrftoken = cookie['csrftoken']

	// add value to cookie
	const my_cookie_value = '$mol'
	const cookie = $mol_cookie.all()
	cookie['my_cookie_key'] = my_cookie_value
	$mol_cookie.set( cookie )
}
```

## Properties

Method of parsing cookie string and return it's as dict[key, value].

    parse( cookie: string ) : { [ key: string ]: string }

Method of composing cookie from dict to string.

    compose( cookie: { [ key: string ]: string } ): string

Returns `document.cookie` as dict.

    all() : { [ key: string ]: string }

Set `document.cookie` from dict and return result string.

    set( cookie: { [ key: string ]: string } ): string

## Features

> The `document.cookie` parameter has a specific format, 
> where `;` is used to separate pairs and `=` to separate the key-value in a pair. 
> The `;` character is not placed at end of string.

#### Examples:

```ts
// One pair of key-value
'csrftoken=t0o1k2e3n4'
// Two pairs with '=' in value
'csrftoken=t0o1k2e3n4; _yasc=YgyzmOYTaIY6Ae005+p3sSL5jXatVV+eEb2dblaoTjDxGtW64tufghFhNG1k9gw='
// Three pairs without ';' at end of string
'csrftoken=t0o1k2e3n4; user=admin; yandexuid=6095163331678543844'
```

## More about cookie

[Mozilla Developer: Cookie](https://developer.mozilla.org/ru/docs/Web/API/Document/cookie)

[Learn JS: Cookie](https://learn.javascript.ru/cookie)
