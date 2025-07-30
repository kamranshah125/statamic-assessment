export default function blogComponent() {
    return {
        posts: [],
        visiblePosts: [],
        categories: [],
        category: null,
        perPage: 4,
        currentPage: 1,
        hasMore: true,

        async fetchPosts() {
            const res = await fetch('/api/collections/blog/entries');
            const data = await res.json();

            this.posts = data.data.map(item => ({
                id: item.id,
                title: item.title,
                excerpt: item.excerpt || '',
                category: item.category?.[0] || 'Uncategorized',
                image: item.image
                    ? `/storage/${item.image}` 
                    : 'https://via.placeholder.com/600x300?text=No+Image'
            }));

            this.extractCategories();
            this.updateVisiblePosts();
        },

        extractCategories() {
            this.categories = [...new Set(this.posts.map(p => p.category))];
        },

        updateVisiblePosts() {
            const filtered = this.category
                ? this.posts.filter(p => p.category === this.category)
                : this.posts;

            const start = 0;
            const end = this.currentPage * this.perPage;

            this.visiblePosts = filtered.slice(start, end);
            this.hasMore = filtered.length > this.visiblePosts.length;
        },

        filterBy(cat) {
            this.category = cat;
            this.currentPage = 1;
            this.updateVisiblePosts();
        },

        loadMore() {
            this.currentPage++;
            this.updateVisiblePosts();
        }
    };
}
