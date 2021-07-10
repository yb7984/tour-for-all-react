import { useLocation } from "react-router-dom";

const useQueryParams = () => {
    const { search, hash , pathname } = useLocation();

    const params = new URLSearchParams(search);

    const searchParams = {};

    for (const [key, value] of params.entries()) {
        searchParams[key] = value;
    }

    return {
        searchParams,
        search,
        hash, 
        pathname
    }
};

export default useQueryParams;

