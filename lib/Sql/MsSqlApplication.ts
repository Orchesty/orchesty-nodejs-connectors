import ASqlApplication, { IDialect } from './Common/ASqlApplication';

export default class MsSqlApplication extends ASqlApplication {

    public constructor() {
        super(IDialect.mssql);
    }

    public getPublicName(): string {
        return 'MsSQL';
    }

    public getDescription(): string {
        return 'Relational database and analytics system for e-commerce a business by Microsoft';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOnVybCgjU1ZHSURfMV8pO30KCS5zdDF7ZmlsbDp1cmwoI1NWR0lEXzJfKTt9Cgkuc3Qye2ZpbGw6dXJsKCNTVkdJRF8zXyk7fQo8L3N0eWxlPgo8ZyB0cmFuc2Zvcm09Im1hdHJpeCguNTY5IDAgMCAuNTY5IDE5OS40NTEgLTgyLjczNSkiPgoJCgkJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMTU1NzYuMDc1MiIgeTE9Ii03NDczLjg2MTgiIHgyPSItMTU0NzMuNTQ3OSIgeTI9Ii03NTM0LjQ0MzgiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoNy4wMjE0NjBlLTAyIDAgMCA3LjAyMTQ2MGUtMDIgNzc3LjUyODggODI4LjEzNjIpIj4KCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojOTA5Q0E5Ii8+CgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0VERURFRSIvPgoJPC9saW5lYXJHcmFkaWVudD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMjQxLjcsMjI3LjVsLTM1LDExLjRsLTMwLjQsMTMuNGwtOC41LDIuMmMtMi4yLDIuMS00LjQsNC4yLTYuOSw2LjNjLTIuNywyLjMtNS4yLDQuNC03LjEsNgoJCWMtMi4xLDEuNy01LjMsNC45LTYuOSw2LjljLTIuNCwzLTQuMyw2LjItNS4xLDguN2MtMS41LDQuNC0wLjcsOC45LDIuMSwxMy4xYzMuNiw1LjMsMTAuOCwxMC43LDE5LjEsMTQuNAoJCWM0LjMsMS45LDExLjQsNC4zLDE2LjgsNS42YzksMi4zLDI2LjMsNC43LDM1LjksNS4xYzEuOSwwLjEsNC41LDAuMSw0LjYsMGMwLjItMC4xLDEuNy0zLDMuNC02LjVjNS45LTEyLDEwLjEtMjMuMiwxMi40LTMyLjgKCQljMS40LTUuOCwyLjUtMTMuNiwzLjItMjIuN2MwLjItMi42LDAuMy0xMS4yLDAuMS0xNC4xYy0wLjItNC44LTAuNy04LjYtMS4zLTEyLjRjLTAuMS0wLjYtMC4xLTEuMS0wLjEtMS4xCgkJYzAuMS0wLjEsMC40LTAuMiw0LjctMS40TC0yNDEuNywyMjcuNUwtMjQxLjcsMjI3LjVMLTI0MS43LDIyNy41TC0yNDEuNywyMjcuNXogTS0yNDkuNywyMzIuMmMwLjMsMCwxLjIsOC4xLDEuNCwxMy4yCgkJYzAuMSwxLjEsMCwxLjgsMCwxLjhjLTAuMiwwLTQuNS0yLjUtNy41LTQuNGMtMi42LTEuNy03LjctNS04LjUtNS42Yy0wLjMtMC4yLTAuMi0wLjIsMS45LTFDLTI1OC43LDIzNS0yNTAsMjMyLjItMjQ5LjcsMjMyLjJ6CgkJIE0tMjY3LjUsMjM4YzAuMiwwLDAuOCwwLjMsMi4zLDEuMmM1LjQsMy40LDEyLjksNy41LDE2LDguOWMxLDAuNCwxLjEsMC4zLTEuMiwxLjhjLTQuOCwzLjMtMTAuOCw2LjUtMTguMiw5LjgKCQljLTEuMywwLjYtMi40LDEtMi40LDFjLTAuMSwwLDAuMS0wLjcsMC4zLTEuNWMxLjgtNi42LDIuOC0xMy4zLDIuOC0xOC42Qy0yNjcuNywyMzguMS0yNjcuNywyMzguMS0yNjcuNSwyMzgKCQlDLTI2Ny42LDIzOC0yNjcuNSwyMzgtMjY3LjUsMjM4TC0yNjcuNSwyMzh6IE0tMjcxLjIsMjM5LjRjMC4yLDAuMiwwLjEsNi4xLTAuMiw3LjdjLTAuNSwzLjktMS4yLDcuNS0yLjQsMTEuNQoJCWMtMC4zLDEtMC42LDEuOC0wLjYsMS45Yy0wLjEsMC4xLTMuNy0zLjQtNC45LTQuOGMtMi4xLTIuNC0zLjctNC44LTQuOS03LjFjLTAuNi0xLjItMS42LTMuNS0xLjUtMy42CgkJQy0yODUuMiwyNDQuNy0yNzEuMywyMzkuMy0yNzEuMiwyMzkuNEwtMjcxLjIsMjM5LjR6IE0tMjg4LjUsMjQ2LjJDLTI4OC40LDI0Ni4yLTI4OC40LDI0Ni4yLTI4OC41LDI0Ni4yYzAuMSwwLjEsMC4zLDAuNSwwLjUsMQoJCWMwLjgsMi4zLDIuNyw1LjcsNC40LDcuOWMxLjgsMi40LDQuMiw0LjksNi4xLDYuNmMwLjYsMC41LDEuMiwxLDEuMywxLjFjMC4yLDAuMiwwLjIsMC4xLTQuMSwxLjhjLTUsMS45LTEwLjQsMy44LTE2LjcsNS44CgkJYy0xLjUsMC41LTMsMS00LjUsMS41Yy0wLjIsMC4xLTAuMi0wLjEsMC41LTEuMWMzLjEtNC44LDcuOC0xNC4zLDEwLjQtMjEuMWMwLjQtMS4yLDAuOS0yLjMsMS0yLjZjMC4xLTAuNCwwLjItMC41LDAuNi0wLjcKCQlDLTI4OC43LDI0Ni4zLTI4OC41LDI0Ni4yLTI4OC41LDI0Ni4yTC0yODguNSwyNDYuMnogTS0yOTMuOCwyNDguNGMwLjEsMC4xLTEuMywyLjktMi42LDUuNWMtMi42LDUtNS40LDkuOS05LjEsMTUuOQoJCWMtMC42LDEtMS4yLDItMS4zLDIuMWMtMC4xLDAuMi0wLjIsMC4xLTAuNi0wLjdjLTAuOS0xLjgtMS42LTQtMi02LjFjLTAuNC0yLjEtMC4zLTUuNywwLjEtNy45YzAuMy0xLjYsMC4zLTEuNiwxLjEtMgoJCUMtMzA0LjgsMjUzLjUtMjkzLjksMjQ4LjMtMjkzLjgsMjQ4LjRMLTI5My44LDI0OC40eiBNLTI0OC4xLDI1MC4zdjEuMWMwLDUuOS0wLjYsMTQtMS42LDE5LjljLTAuMiwxLTAuMywxLjktMC4zLDEuOQoJCWMwLDAtMC44LTAuMi0xLjctMC41Yy00LTEuMi04LjMtMy4xLTEyLjItNS4yYy0yLjYtMS40LTYuMy0zLjctNi4yLTMuOGMwLDAsMS4xLTAuNiwyLjQtMS4zYzUuMi0yLjcsMTAuMi01LjYsMTQuNS04LjUKCQljMS42LTEuMSw0LTIuOCw0LjYtMy4zTC0yNDguMSwyNTAuM0wtMjQ4LjEsMjUwLjN6IE0tMzEzLjcsMjU4LjFjMC4xLDAsMC4xLDAuMi0wLjEsMS4yYy0wLjEsMC43LTAuMiwyLTAuMywyLjgKCQljLTAuMiwzLjksMC40LDYuNywyLjMsMTAuNmMwLjUsMS4xLDEsMiwwLjksMmMtMC4yLDAuMi0xNy43LDUuMy0yMy4yLDYuOGMtMS42LDAuNC0zLjEsMC44LTMuMiwwLjljLTAuMiwwLjEtMC4yLDAtMC4xLTAuNAoJCWMwLjYtMy45LDMuNi05LDcuNy0xMy4yYzIuOC0yLjksNC45LTQuNSw4LjctNi43Qy0zMTguMiwyNjAuNS0zMTQuMSwyNTguMi0zMTMuNywyNTguMUMtMzEzLjgsMjU4LjEtMzEzLjgsMjU4LjEtMzEzLjcsMjU4LjEKCQlMLTMxMy43LDI1OC4xeiBNLTI3Mi41LDI2NS41YzAsMCwwLjcsMC4zLDEuNCwwLjhjNS43LDMuMywxMy41LDYuMywyMC4zLDcuOWwwLjYsMC4xbC0wLjgsMC41Yy0zLjUsMi0xNS4xLDYuOC0yNi45LDExLjIKCQljLTEuNywwLjYtMy40LDEuMy0zLjcsMS40Yy0wLjMsMC4xLTAuNiwwLjItMC42LDAuMmMwLDAsMC41LTEsMS4xLTIuMWMzLjMtNi4yLDYuNi0xMy43LDguMy0xOQoJCUMtMjcyLjYsMjY2LTI3Mi41LDI2NS41LTI3Mi41LDI2NS41TC0yNzIuNSwyNjUuNXogTS0yNzYuNywyNjYuOWMwLDAtMC4yLDAuNi0wLjQsMS4yYy0yLjMsNS42LTUuMywxMS43LTkuMiwxOC41CgkJYy0xLDEuNy0xLjgsMy4xLTEuOCwzLjFjMCwwLTAuOC0wLjUtMS44LTEuMWMtNS42LTMuNC0xMC42LTcuNy0xMy44LTExLjhsLTAuNS0wLjZsMi40LTAuN2M4LjYtMi40LDE1LjktNC45LDIzLjItOAoJCUMtMjc3LjUsMjY3LjItMjc2LjcsMjY2LjktMjc2LjcsMjY2Ljl6IE0tMjUwLjUsMjc2Qy0yNTAuNSwyNzYtMjUwLjUsMjc2LTI1MC41LDI3NmMwLDAuNi0xLjMsNi4xLTIuNCwxMAoJCWMtMC45LDMuMy0xLjcsNS45LTMuMiwxMC41Yy0wLjYsMi0xLjIsMy43LTEuMiwzLjdjMCwwLTAuMiwwLTAuMy0wLjFjLTcuOS0xLjQtMTQuOS0zLjQtMjEuNS02LjFjLTEuOS0wLjctNC41LTEuOS00LjctMi4xCgkJYy0wLjEtMC4xLDEuNS0wLjgsMy41LTEuN2MxMi01LjMsMjQuNS0xMS4yLDI4LjgtMTMuOEMtMjUxLDI3Ni4xLTI1MC42LDI3Ni0yNTAuNSwyNzZMLTI1MC41LDI3NnogTS0zMTAuOSwyNzgKCQljMC4xLDAuMS0zLjMsNC45LTgsMTEuNWMtMS42LDIuMy0zLjUsNS00LjMsNmMtMC43LDEtMS44LDIuNi0yLjQsMy41bC0xLjEsMS43bC0xLjItMWMtMS40LTEuMi0zLjgtMy42LTQuOS01CgkJYy0yLjMtMi44LTMuOC01LjgtNC40LTguNWMtMC4zLTEuMy0wLjMtMS45LDAtMmMwLjQtMC4xLDcuNS0xLjgsMTQuMS0zLjNjMy43LTAuOCw3LjktMS45LDkuNS0yLjIKCQlDLTMxMi4xLDI3OC4zLTMxMC45LDI3OC0zMTAuOSwyNzhMLTMxMC45LDI3OHogTS0zMDcuNSwyNzkuM2wwLjgsMWMzLjgsNC4zLDcuNyw3LjQsMTIuNCwxMC4yYzAuOCwwLjUsMS41LDAuOSwxLjQsMC45CgkJYy0wLjIsMC4xLTE2LjMsNS45LTIzLjgsOC41Yy00LjIsMS41LTcuNywyLjctNy43LDIuN2MwLDAtMC4zLTAuMi0wLjUtMC4zbC0wLjUtMC4zbDAuOC0xLjFjMi41LTMuNiw1LjYtNy41LDEyLjQtMTUuNwoJCUwtMzA3LjUsMjc5LjNMLTMwNy41LDI3OS4zeiBNLTI4Ni40LDI5NC40YzAsMCwxLjIsMC40LDIuNiwwLjljMy40LDEuMyw2LjIsMi4xLDkuOCwzYzQuNSwxLjEsMTEsMi4yLDE0LjgsMi42CgkJYzAuNiwwLjEsMC45LDAuMSwwLjgsMC4yYy0wLjIsMC4xLTQuMSwxLjQtNi45LDIuM2MtNC41LDEuNC0xOC40LDUuNS0yOS44LDguOGMtMi4xLDAuNi0zLjksMS4xLTQsMS4xYy0wLjMsMC4xLTEuMS0wLjItMS4xLTAuMwoJCWMwLTAuMSwwLjYtMC45LDEuNC0xLjhjMy44LTQuNSw3LjYtOS42LDEwLjctMTQuNEMtMjg3LjEsMjk1LjYtMjg2LjQsMjk0LjUtMjg2LjQsMjk0LjRMLTI4Ni40LDI5NC40eiBNLTI5MSwyOTQuNgoJCWMwLDAtMS45LDMtNS4xLDguMmMtMS40LDIuMi0zLDQuNy0zLjUsNS42Yy0wLjUsMC44LTEuMywyLjItMS44LDIuOWwtMC44LDEuM2wtMC40LTAuMWMtMS0wLjMtNy42LTIuNi05LjQtMy4zCgkJYy0yLjItMC45LTQuNS0xLjktNi4yLTIuOGMtMi4xLTEuMS00LjgtMi44LTQuNS0yLjljMC4xLDAsMy43LTEsOC0yLjJjMTEuNi0zLjEsMTgtNSwyMi4yLTYuM0MtMjkxLjcsMjk0LjctMjkxLjEsMjk0LjYtMjkxLDI5NC42CgkJTC0yOTEsMjk0LjZ6IE0tMjU4LjEsMzAyLjNMLTI1OC4xLDMwMi4zYzAuMSwwLjMtNC4yLDEyLjItNS43LDE1LjljLTAuMywwLjgtMC41LDEuMS0wLjcsMWMtMC40LDAtNi43LTAuOS0xMC40LTEuNQoJCWMtNi42LTEtMTcuNi0yLjktMjAuNC0zLjZsLTAuNi0wLjFsMy45LTAuOWM4LjUtMS45LDEyLjUtMi45LDE2LjctNC4yYzUuMi0xLjYsMTAuNC0zLjYsMTUuNi02CgkJQy0yNTksMzAyLjYtMjU4LjMsMzAyLjMtMjU4LjEsMzAyLjNMLTI1OC4xLDMwMi4zeiIvPgoJCgkJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMTU1NzIuMDMxMiIgeTE9Ii05NDgwLjU0NjkiIHgyPSItMTU0ODkuNTM0MiIgeTI9Ii05NDgwLjU0NjkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoNy4wMjE0NjBlLTAyIDAgMCA3LjAyMTQ2MGUtMDIgNzc3LjUyODggODI4LjEzNjIpIj4KCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojOTM5RkFCIi8+CgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0RDREVFMSIvPgoJPC9saW5lYXJHcmFkaWVudD4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0tMjc3LjgsMTQ1LjljLTAuNi0wLjEtMTAsMy4zLTE2LDUuOGMtOC4yLDMuMy0xNC41LDYuNS0xOC40LDkuM2MtMS41LDEtMy4zLDIuOS0zLjYsMy42CgkJYy0wLjEsMC4zLTAuMiwwLjYtMC4yLDAuOWwzLjUsMy40bDguNCwyLjdsMjAuMSwzLjZsMjMsMy45bDAuMi0yYy0wLjEsMC0wLjEsMC0wLjIsMGwtMy0wLjVsLTAuNi0xLjFjLTMuMS01LjUtNi42LTEyLjMtOC42LTE2LjkKCQljLTEuNi0zLjYtMy03LjctMy45LTEwLjdDLTI3Ny40LDE0Ni4xLTI3Ny41LDE0NS45LTI3Ny44LDE0NS45TC0yNzcuOCwxNDUuOUwtMjc3LjgsMTQ1LjlMLTI3Ny44LDE0NS45eiBNLTI3OC4yLDE0Ny4zCgkJTC0yNzguMiwxNDcuM2MwLjEsMCwwLjIsMC44LDAuMywxLjZjMC40LDMuNywxLjMsNy4zLDIuNiwxMS4xYzEsMi45LDEsMi44LTAuMiwyLjRjLTIuNy0wLjctMTQuOC0yLjgtMjMuNS00CgkJYy0xLjQtMC4yLTIuNi0wLjQtMi42LTAuNGMtMC4xLTAuMSw2LjMtMy41LDkuMi00LjhDLTI4OC45LDE1MS42LTI3OC45LDE0Ny40LTI3OC4yLDE0Ny4zeiBNLTMwMy43LDE1OS4xbDEsMC4zCgkJYzUuNiwxLjksMTkuNyw0LjYsMjcuNSw1LjJjMC45LDAuMSwxLjYsMC4yLDEuNiwwLjJjMCwwLTAuNywwLjQtMS43LDAuOWMtMy44LDEuOS03LjksNC4yLTEwLjcsNmMtMC44LDAuNS0xLjYsMS0xLjcsMQoJCWMtMC4xLDAtMC43LTAuMS0xLjItMC4ybC0xLjEtMC4ybC0yLjYtMi42Yy00LjctNC41LTguMy04LTkuNy05LjNMLTMwMy43LDE1OS4xeiBNLTMwNC43LDE1OS45bDMuNyw0LjdjMiwyLjYsNC4xLDUuMSw0LjUsNS42CgkJYzAuNCwwLjYsMC44LDEsMC44LDFjLTAuMSwwLjEtNS40LTEtOC4yLTEuNmMtMi45LTAuNy00LjEtMS01LjgtMS41bC0xLjUtMC41di0wLjRjMC0xLjgsMi4zLTQuNCw2LjEtNy4xTC0zMDQuNywxNTkuOQoJCUwtMzA0LjcsMTU5Ljl6IE0tMjczLjEsMTY2LjNjMC4xLDAsMC4yLDAuMiwwLjYsMWMwLjksMiwzLjcsNy4zLDQuNCw4LjRjMC4yLDAuMywwLjYsMC40LTMuMS0wLjJjLTktMS41LTExLjgtMS45LTExLjgtMgoJCWMwLDAsMC4zLTAuMiwwLjYtMC40YzIuOC0xLjUsNS42LTMuNSw4LjEtNS42YzAuNi0wLjUsMS4yLTEsMS4zLTEuMUMtMjczLjEsMTY2LjMtMjczLjEsMTY2LjMtMjczLjEsMTY2LjNMLTI3My4xLDE2Ni4zeiIvPgoJCgkJPHJhZGlhbEdyYWRpZW50IGlkPSJTVkdJRF8zXyIgY3g9Ii0xMDk1NC44MDU3IiBjeT0iLTE0NDEyLjI2NjYiIHI9IjEwOS41MzA0IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC02Ljc0MjY1MGUtMDIgLTEuMDEyODIwZS0wMiAyLjA0ODQwMGUtMDIgLTAuMTM0OSAtNzA3LjkwOTggLTE4NDUuMzg4NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRUUzNTJDIi8+CgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0E5MUQyMiIvPgoJPC9yYWRpYWxHcmFkaWVudD4KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0tMzE1LjYsMTY0LjFjMCwwLTAuNiwwLjksMCwyLjNjMC4zLDAuOCwxLjMsMS45LDIuNSwyLjljMCwwLDExLjgsMTEuNSwxMy4yLDEzLjFjNi41LDcuNSw5LjMsMTQuOSw5LjYsMjUuMQoJCWMwLjIsNi42LTEuMSwxMi4zLTQuMiwxOWMtNS41LDEyLTE3LjEsMjUuMy0zNSw0MGwyLjYtMC45YzEuNy0xLjMsNC0yLjYsOS40LTUuNmMxMi41LTYuOCwyNi41LTEzLjEsNDMuNy0xOS41CgkJYzI0LjgtOS4zLDY1LjUtMjAuMiw4OC42LTIzLjdsMi40LTAuNGwtMC40LTAuNmMtMi4xLTMuMy0zLjYtNS4zLTUuMy03LjVjLTUuMS02LjMtMTEuMi0xMS40LTE4LjgtMTUuNgoJCWMtMTAuNC01LjgtMjMuOC0xMC4zLTQwLjgtMTMuN2MtMy4yLTAuNi0xMC4yLTEuOS0xNS45LTIuN2MtMTIuMS0xLjktMTkuOS0zLjItMjguNi00LjdjLTMuMS0wLjUtNy43LTEuMy0xMC44LTIKCQljLTEuNi0wLjMtNC42LTEuMS03LTEuOUMtMzEyLjMsMTY3LjEtMzE1LDE2Ni40LTMxNS42LDE2NC4xTC0zMTUuNiwxNjQuMXogTS0zMDguOCwxNzAuOGMwLDAsMC40LDAuMSwxLDAuM2MxLDAuMywyLjMsMC43LDMuOCwxLjIKCQljMS4yLDAuMywyLjMsMC42LDMuNSwwLjljMS42LDAuNCwyLjksMC44LDIuOSwwLjhjMC4yLDAuMiwyLjksOC43LDMuOCwxMmMwLjMsMS4yLDAuNiwyLjMsMC42LDIuM2MwLDAtMC4zLTAuNC0wLjctMQoJCWMtMy4xLTUuNC04LTExLTEzLjYtMTUuNEMtMzA4LjIsMTcxLjMtMzA4LjgsMTcwLjgtMzA4LjgsMTcwLjhMLTMwOC44LDE3MC44eiBNLTI5NS44LDE3NC40YzAuMSwwLDAuNywwLjEsMS40LDAuMgoJCWM0LjUsMSwxMi42LDIuNSwxNy43LDMuNGMwLjksMC4xLDEuNiwwLjMsMS42LDAuM2MwLDAuMS0wLjMsMC4yLTAuNywwLjRjLTAuOSwwLjQtNC40LDIuNS01LjYsMy4zYy0yLjksMi01LjYsNC4xLTcuNSw2CgkJYy0wLjgsMC44LTEuNCwxLjQtMS40LDEuNHMtMC4yLTAuNC0wLjMtMWMtMS0zLjctMi45LTkuMS00LjctMTNDLTI5NS42LDE3NC45LTI5NS44LDE3NC40LTI5NS44LDE3NC40CgkJQy0yOTUuOCwxNzQuNC0yOTUuOCwxNzQuNC0yOTUuOCwxNzQuNEwtMjk1LjgsMTc0LjR6IE0tMjcyLjksMTc4LjdjMC4yLDAuMSwwLjQsMSwxLDIuOWMxLDMuOCwxLjQsOC4xLDEuMywxMi4xCgkJYy0wLjEsMS4xLTAuMSwyLjEtMC4yLDIuM2wtMC4xLDAuM2wtMS40LTAuNGMtMi44LTAuOS03LjQtMi4yLTExLjQtMy40Yy0yLjItMC42LTQuMS0xLjItNC4xLTEuMmMwLTAuMiwzLjMtMy40LDQuNy00LjcKCQlDLTI4MC40LDE4NC4yLTI3My4xLDE3OC42LTI3Mi45LDE3OC43TC0yNzIuOSwxNzguN3ogTS0yNzEsMTc5YzAuMS0wLjEsMTAuOSwxLjgsMTUuOSwyLjhjMy43LDAuNyw5LDEuOCw5LjMsMgoJCWMwLjIsMC4xLTAuNCwwLjQtMi4yLDEuMmMtNywzLjEtMTIuMiw2LTE3LjMsOS40Yy0xLjMsMC45LTIuNSwxLjYtMi41LDEuNnMtMC4xLTAuOC0wLjEtMS43YzAtNS0xLTEwLjEtMi45LTE0LjQKCQlDLTI3MC45LDE3OS40LTI3MS4xLDE3OS0yNzEsMTc5eiBNLTI0Mi45LDE4NC41YzAuMSwwLjEtMC4zLDIuMi0wLjYsMy41Yy0xLDMuOS0zLjUsOS44LTYuNywxNS4zYy0wLjYsMS0xLjEsMS44LTEuMSwxLjgKCQljLTAuMSwwLTAuOC0wLjQtMS42LTAuOGMtMy4xLTEuOC02LjYtMy41LTEwLjQtNS4xYy0xLjEtMC40LTItMC44LTItMC45Yy0wLjItMC4yLDguMy01LjgsMTIuOC04LjUKCQlDLTI0OC45LDE4Ny43LTI0MywxODQuNC0yNDIuOSwxODQuNUwtMjQyLjksMTg0LjV6IE0tMjQwLjksMTg0LjljMC4yLDAsNS4xLDEuMyw3LjYsMi4xYzYuMiwxLjksMTMuNCw0LjUsMTgsNi42bDEuOSwwLjlsLTEuMywwLjMKCQljLTExLjQsMi42LTIxLjEsNS42LTMwLjUsOS40Yy0wLjgsMC4zLTEuNSwwLjYtMS41LDAuNmMtMC4xLDAsMC4yLTAuNiwwLjYtMS4zYzIuOC02LDQuNy0xMi4zLDUuMS0xNy42CgkJQy0yNDEuMSwxODUuMi0yNDEsMTg0LjktMjQwLjksMTg0LjlMLTI0MC45LDE4NC45eiBNLTI4OC44LDE5NS45YzAuMS0wLjEsMy44LDAuOCw1LjcsMS4zYzMsMC44LDkuNCwzLDkuNCwzLjEKCQljMCwwLTAuNywwLjYtMS42LDEuNGMtMy41LDIuOS02LjgsNS45LTEwLjgsOS44Yy0xLjIsMS4xLTIuMiwyLjEtMi4yLDIuMWMtMC4xLDAtMC4xLTAuMi0wLjEtMC40YzAuNi00LjQsMC41LTEwLjItMC40LTE1LjkKCQlDLTI4OC44LDE5Ni41LTI4OC45LDE5NS45LTI4OC44LDE5NS45eiBNLTIxMS42LDE5NS45YzAuMSwwLjEtMS43LDIuOC0yLjgsNC40Yy0xLjYsMi4zLTMuOSw1LjMtOS4yLDExLjkKCQljLTIuOCwzLjUtNS45LDcuNC02LjksOC44Yy0xLjEsMS4zLTEuOSwyLjQtMiwyLjRjMCwwLTAuNC0wLjUtMC43LTEuMWMtMy00LjQtNi41LTguMy0xMC43LTExLjhjLTAuOC0wLjctMS43LTEuNC0yLTEuNgoJCWMtMC4zLTAuMi0wLjUtMC40LTAuNS0wLjRjMC0wLjEsNC41LTIsNy45LTMuNGM2LTIuNCwxNC4xLTUuMywyMC4yLTcuMkMtMjE1LjEsMTk2LjktMjExLjYsMTk1LjktMjExLjYsMTk1LjlMLTIxMS42LDE5NS45egoJCSBNLTIwOS42LDE5Ni41YzAuMSwwLDAuNywwLjMsMS41LDAuN2M2LjQsMy43LDEyLjcsOC40LDE3LjcsMTMuM2MxLjQsMS40LDQuOSw1LDQuOCw1YzAsMC0xLjIsMC4xLTIuNiwwLjIKCQljLTExLjEsMC44LTI1LjQsMy4yLTM5LjEsNi41Yy0wLjksMC4yLTEuNywwLjQtMS44LDAuNGMtMC4xLDAsMS0xLDIuMy0yLjNjOC03LjcsMTEuNy0xMi42LDE2LjEtMjEuNAoJCUMtMjEwLjEsMTk3LjctMjA5LjYsMTk2LjUtMjA5LjYsMTk2LjVDLTIwOS42LDE5Ni41LTIwOS42LDE5Ni41LTIwOS42LDE5Ni41TC0yMDkuNiwxOTYuNXogTS0yNjguNSwyMDIuNWMwLjQsMC4xLDMuOCwxLjcsNi40LDMKCQljMi40LDEuMiw2LDMuMSw2LjEsMy4zYzAsMC0xLjIsMC43LTIuOCwxLjVjLTUsMi41LTkuMiw0LjgtMTMuNyw3LjVjLTEuMywwLjgtMi4zLDEuNC0yLjQsMS40Yy0wLjEsMC0wLjEtMC4xLDAuNi0xLjQKCQljMi40LTQuMyw0LjMtOS41LDUuNC0xNC42Qy0yNjguNiwyMDIuOC0yNjguNSwyMDIuNS0yNjguNSwyMDIuNUwtMjY4LjUsMjAyLjV6IE0tMjcxLjksMjAzLjFjMC4xLDAuMS0wLjgsMy4zLTEuNCw1LjEKCQljLTEuMSwzLjQtMi45LDcuNi00LjcsMTAuN2MtMC40LDAuNy0xLjEsMS44LTEuNCwyLjRsLTAuNywxLjFsLTEuNS0xLjRjLTEuNy0xLjctMy4xLTIuNy00LjktMy42Yy0wLjctMC40LTEuMy0wLjctMS4zLTAuNwoJCWMwLTAuMiw0LjUtNC4zLDgtNy4zQy0yNzcuMiwyMDcuMy0yNzIsMjAzLTI3MS45LDIwMy4xTC0yNzEuOSwyMDMuMXogTS0yNTAuOSwyMTEuOGwxLjMsMC44YzMsMS45LDYuNSw0LjUsOS4xLDYuNwoJCWMxLjUsMS4yLDQuNCwzLjksNSw0LjVsMC4zLDAuM2wtMi4xLDAuNmMtMTIuMSwzLjQtMjEuNSw2LjMtMzIuNCwxMC40Yy0xLjIsMC40LTIuMiwwLjgtMi4zLDAuOGMtMC4yLDAtMC4zLDAuMSwyLjQtMi40CgkJYzctNi40LDEzLjItMTMuNSwxNy44LTIwLjRMLTI1MC45LDIxMS44TC0yNTAuOSwyMTEuOHogTS0yNTYuNCwyMTMuMWMwLjEsMC4xLTMuNiw1LjItNS43LDhjLTIuNiwzLjQtNy4yLDkuMi0xMC40LDEzCgkJYy0xLjMsMS42LTIuNSwyLjktMi41LDIuOWMtMC4xLDAtMC4xLTAuNC0wLjEtMWMwLTMuMi0wLjgtNi42LTIuMi05LjVjLTAuNi0xLjItMC43LTEuNS0wLjYtMS42YzAuNS0wLjQsOC4yLTQuOCwxMy4xLTcuNQoJCUMtMjYxLjYsMjE1LjctMjU2LjUsMjEzLjEtMjU2LjQsMjEzLjFMLTI1Ni40LDIxMy4xeiBNLTI4OS44LDIyMS4zYzAuMSwwLDAuNywwLjMsMS40LDAuN2MxLjcsMC45LDMuMiwyLDQuNSwzLjEKCQljMC4xLDAuMS0wLjYsMC42LTEuNSwxLjNjLTIuNSwxLjgtNi4zLDQuNy04LjUsNi41Yy0yLjMsMS45LTIuNCwxLjktMi4xLDEuNWMxLjctMi43LDIuNi00LjIsMy41LTYuMWMwLjgtMS43LDEuNi0zLjgsMi4yLTUuNQoJCUMtMjkwLjEsMjIxLjktMjg5LjksMjIxLjMtMjg5LjgsMjIxLjNMLTI4OS44LDIyMS4zeiBNLTI4MC45LDIyOC4zYzAuMSwwLDAuMywwLjIsMSwxLjNjMS41LDIuMiwyLjcsNS4zLDMsNy43bDAuMSwwLjVsLTMuNiwxLjQKCQljLTYuNSwyLjUtMTIuNSw1LTE2LjUsNi44Yy0xLjEsMC41LTMuMSwxLjUtNC40LDIuMWMtMS4zLDAuNy0yLjQsMS4yLTIuNCwxLjFjMCwwLDAuOC0wLjYsMS44LTEuNGM3LjktNS43LDE0LjgtMTIsMTkuOS0xOC4zCgkJQy0yODEuNSwyMjktMjgxLDIyOC40LTI4MC45LDIyOC4zTC0yODAuOSwyMjguM0wtMjgwLjksMjI4LjN6IE0tMjg1LDIyOS4zYzAuMSwwLjEtMi45LDMuNS01LDUuNmMtNS4xLDUuMi0xMC4yLDkuMy0xNi40LDEzLjMKCQljLTAuOCwwLjUtMS41LDEtMS42LDFjLTAuMiwwLjEsMC4xLTAuMiwyLjgtMy4xYzEuNy0xLjksMy4xLTMuNSw0LjYtNS40YzEtMS4zLDEuMi0xLjUsMi42LTIuNQoJCUMtMjk0LjEsMjM1LjMtMjg1LjEsMjI5LjItMjg1LDIyOS4zeiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

}
