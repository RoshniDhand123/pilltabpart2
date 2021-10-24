const getThemeByRole = (role: string): string => {
    switch (role) {
        case "Nurse":
            return "linear-gradient(229.34deg, #00F2C3 8.35%, #0098F0 89.61%);";
        case "Physician":
            return "linear-gradient(229.34deg,#ff8d72 8.35%,#ff6491 89.61%);";
        case "Pharmacist":
            return "linear-gradient(229.34deg,#fd5d93 8.35%,#ec250d 87.43%);";
        default:
            return "linear-gradient(360deg, #BA54F5 0%, #E14ECA 100%);";
    }
}

export {
    getThemeByRole
}