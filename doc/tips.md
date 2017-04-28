# Debug

- Enable debug by starting with `DEBUG=@*` or `DEBUG=*` in node. Each package has it's own namespace such as `DEBUG=@justinr1234-lib` that will filter the messages shown.
- Enable debug in the browser by setting a value in local storage the same as node but open the dev console and type `localStorage.debug = '@*'`
- Throughout this app debug namespaces start with the `@` symbol.