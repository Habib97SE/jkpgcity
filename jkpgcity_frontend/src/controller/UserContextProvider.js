import { useContext} from "react";

function useUserContext() {
    // const context = useContext(UserContext);
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}