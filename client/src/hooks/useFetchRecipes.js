import useSWR from 'swr'; 

function useFetchFeaturedRecipes() {
    const link = `${process.env.REACT_APP_API_URL}/recipes/listall`;
    const fetcher = (url) => {
        return fetch(url).then(res => {
            return res.json();
        });
    };
    const { data, error } = useSWR(link, fetcher);
    return { recipes: data, isLoading: !data && !error, error: error }
}

export default useFetchFeaturedRecipes;