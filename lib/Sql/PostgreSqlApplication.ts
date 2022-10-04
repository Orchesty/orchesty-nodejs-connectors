import ASqlApplication, { IDialect } from './Common/ASqlApplication';

export default class PostgreSqlApplication extends ASqlApplication {

    public constructor() {
        super(IDialect.postgres);
    }

    public getPublicName(): string {
        return 'PostgreSQL';
    }

    public getDescription(): string {
        return 'Powerful, open source object-relational database system that uses and extends the SQL language';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6OC4zMjc1O30KCS5zdDF7ZmlsbDojMzM2NzkxO30KCS5zdDJ7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyLjc3NTg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDN7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyLjc3NTg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO30KCS5zdDR7ZmlsbDojRkZGRkZGO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDowLjkyNTM7fQoJLnN0NXtmaWxsOiNGRkZGRkY7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjAuNDYyNjt9Cgkuc3Q2e2ZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MC42NjgxO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cjwvc3R5bGU+CjxnPgoJPGcgaWQ9Im9yZ2luYWwiPgoJPC9nPgoJPGcgaWQ9IkxheWVyX3gwMDIwXzMiPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03Mi45LDcyLjVjMC42LTUuMywwLjQtNiw0LjQtNS4ybDEsMC4xYzMsMC4xLDYuOS0wLjUsOS4zLTEuNmM1LTIuMyw3LjktNi4yLDMtNS4yYy0xMS4yLDIuMy0xMi0xLjUtMTItMS41CgkJCUM5MC40LDQxLjcsOTUuMywxOS40LDkxLDEzLjlDNzkuNC0wLjksNTkuMyw2LjEsNTguOSw2LjNsLTAuMSwwYy0yLjItMC41LTQuNy0wLjctNy41LTAuOGMtNS4xLTAuMS04LjksMS4zLTExLjgsMy41CgkJCWMwLDAtMzUuOS0xNC44LTM0LjMsMTguNmMwLjQsNy4xLDEwLjIsNTMuOCwyMS45LDM5LjdjNC4zLTUuMiw4LjQtOS41LDguNC05LjVjMi4xLDEuNCw0LjUsMi4xLDcuMSwxLjhsMC4yLTAuMgoJCQljLTAuMSwwLjYsMCwxLjMsMC4xLDJjLTMsMy40LTIuMSw0LTguMiw1LjJjLTYuMSwxLjMtMi41LDMuNS0wLjIsNC4xYzIuOCwwLjcsOS40LDEuNywxMy45LTQuNUw0OC4zLDY3YzEuMiwwLjksMS4xLDYuOCwxLjMsMTEKCQkJYzAuMiw0LjIsMC40LDguMSwxLjMsMTAuNGMwLjksMi4zLDEuOSw4LjMsOS44LDYuNUM2Ny4zLDkzLjYsNzIuNCw5MS42LDcyLjksNzIuNSIvPgoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05MC41LDYwLjdjLTExLjIsMi4zLTEyLTEuNS0xMi0xLjVDOTAuNCw0MS43LDk1LjMsMTkuNCw5MSwxMy45Qzc5LjQtMC45LDU5LjMsNi4xLDU4LjksNi4zbC0wLjEsMAoJCQljLTIuMi0wLjUtNC43LTAuNy03LjUtMC44Yy01LjEtMC4xLTguOSwxLjMtMTEuOCwzLjVjMCwwLTM1LjktMTQuOC0zNC4zLDE4LjZjMC40LDcuMSwxMC4yLDUzLjgsMjEuOSwzOS43CgkJCWM0LjMtNS4yLDguNC05LjUsOC40LTkuNWMyLjEsMS40LDQuNSwyLjEsNy4xLDEuOGwwLjItMC4yYy0wLjEsMC42LDAsMS4zLDAuMSwyYy0zLDMuNC0yLjEsNC04LjIsNS4yYy02LjEsMS4zLTIuNSwzLjUtMC4yLDQuMQoJCQljMi44LDAuNyw5LjQsMS43LDEzLjktNC41TDQ4LjMsNjdjMS4yLDAuOSwyLDYuMiwxLjksMTAuOWMtMC4xLDQuNy0wLjIsOCwwLjcsMTAuNWMwLjksMi41LDEuOSw4LjMsOS44LDYuNQoJCQljNi42LTEuNCwxMC4xLTUuMSwxMC42LTExLjNjMC4zLTQuNCwxLjEtMy43LDEuMi03LjZsMC42LTEuOWMwLjctNS45LDAuMS03LjgsNC4yLTYuOWwxLDAuMWMzLDAuMSw2LjktMC41LDkuMy0xLjYKCQkJQzkyLjUsNjMuNiw5NS40LDU5LjcsOTAuNSw2MC43TDkwLjUsNjAuN3oiLz4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDksNjQuMWMtMC4zLDExLDAuMSwyMi4xLDEuMiwyNC44YzEuMSwyLjcsMy40LDcuOSwxMS4zLDYuMmM2LjYtMS40LDkuMS00LjIsMTAuMS0xMC4zCgkJCWMwLjgtNC41LDIuMy0xNi45LDIuNS0xOS40Ii8+CgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTM5LjQsOC44YzAsMC0zNi0xNC43LTM0LjMsMTguN2MwLjQsNy4xLDEwLjIsNTMuOCwyMS45LDM5LjdjNC4zLTUuMiw4LjItOS4yLDguMi05LjIiLz4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNTguOSw2LjFjLTEuMiwwLjQsMjAtNy44LDMyLjEsNy43YzQuMyw1LjUtMC43LDI3LjctMTIuNSw0NS4zIi8+CgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTc4LjUsNTkuMWMwLDAsMC44LDMuOCwxMiwxLjVjNC45LTEsMiwyLjgtMyw1LjJjLTQuMSwxLjktMTMuMiwyLjQtMTMuNC0wLjJDNzMuNiw1OC43LDc4LjgsNjAuOCw3OC41LDU5LjEKCQkJYy0wLjMtMS41LTIuNy0zLTQuMi02LjhjLTEuMy0zLjMtMTguNC0yOC4yLDQuNy0yNC41YzAuOC0wLjItNi0yMi0yNy43LTIyLjRjLTIxLjctMC40LTIxLDI2LjctMjEsMjYuNyIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00Mi45LDYxLjRjLTMsMy40LTIuMSw0LTguMiw1LjJjLTYuMSwxLjMtMi41LDMuNS0wLjIsNC4xYzIuOCwwLjcsOS40LDEuNywxMy45LTQuNWMxLjQtMS45LDAtNC45LTEuOS01LjcKCQkJQzQ1LjYsNjAuMSw0NC40LDU5LjcsNDIuOSw2MS40TDQyLjksNjEuNHoiLz4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDIuNyw2MS4zYy0wLjMtMiwwLjctNC4zLDEuNy03LjFjMS41LTQuMSw1LjEtOC4zLDIuMy0yMS41Yy0yLjEtOS44LTE2LjMtMi0xNi40LTAuN2MwLDEuMywwLjYsNi43LTAuMiwxMwoJCQljLTEuMSw4LjIsNS4yLDE1LjIsMTIuNiwxNC41Ii8+CgkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTM5LjMsMzEuOWMtMC4xLDAuNSwwLjgsMS43LDIsMS44YzEuMiwwLjIsMi4yLTAuOCwyLjItMS4yYzAuMS0wLjUtMC44LTEtMi0xLjEKCQkJQzQwLjQsMzEuMiwzOS40LDMxLjQsMzkuMywzMS45TDM5LjMsMzEuOXoiLz4KCQk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNNzQuOCwzMC45YzAuMSwwLjUtMC44LDEuNy0yLDEuOGMtMS4yLDAuMi0yLjItMC44LTIuMi0xLjJjLTAuMS0wLjUsMC44LTEsMi0xLjEKCQkJQzczLjgsMzAuMiw3NC44LDMwLjUsNzQuOCwzMC45TDc0LjgsMzAuOXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNzksMjcuOGMwLjIsMy42LTAuOCw2LTAuOSw5LjhjLTAuMiw1LjUsMi42LDExLjgtMS42LDE4LjEiLz4KCQk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNMC45LDEzLjciLz4KCTwvZz4KPC9nPgo8L3N2Zz4K';
    }

}
