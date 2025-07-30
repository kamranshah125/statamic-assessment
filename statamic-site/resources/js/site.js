import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.data('blogList', () => ({
  posts: [],
  filteredPosts: [],
  visiblePosts: [],
  categories: [],
  category: 'All',
  visibleCount: 4,

  async fetchPosts() {
    const res = await fetch('/api/collections/blog/entries')
    const json = await res.json()
    console.log("Fetched data:", json)

    this.posts = data.data.map(entry => ({
  id: entry.id,
  title: entry.title,
  slug: entry.slug,
  excerpt: entry.excerpt ?? '',
  image: entry.image?.[0]?.permalink ?? 'https://via.placeholder.com/600x400',
  categories: entry.category ?? []
}))


    const catSet = new Set()
    this.posts.forEach(post => post.categories.forEach(cat => catSet.add(cat)))
    this.categories = [...catSet]

    this.filterBy('All')
  },

  filterBy(cat) {
    this.category = cat
    this.filteredPosts = this.category === 'All'
      ? this.posts
      : this.posts.filter(p => p.categories.includes(cat))

    this.visiblePosts = this.filteredPosts.slice(0, this.visibleCount)
  },

  loadMore() {
    this.visibleCount += 4
    this.visiblePosts = this.filteredPosts.slice(0, this.visibleCount)
  },

  isVisible(post) {
    return this.visiblePosts.includes(post)
  }
}))

Alpine.start()
