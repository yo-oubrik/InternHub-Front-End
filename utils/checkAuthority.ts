import { Role } from "@/types/types"

export function hasRoleCompany( role : Role ) : boolean {
    return role === Role.COMPANY;
}

export function hasRoleStudent( role : Role ) : boolean {
    return role === Role.STUDENT;
}