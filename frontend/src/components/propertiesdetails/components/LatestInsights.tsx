"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Clock,
  ArrowRight,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  TrendingUp,
  MessageCircle,
} from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  category: string
  featured?: boolean
  tags?: string[]
  comments?: number
  views?: number
}

const articles: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Smart Homes: Integration of AI in Modern Living",
    excerpt:
      "Discover how artificial intelligence is revolutionizing home automation and enhancing living experiences.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    date: "Mar 15, 2024",
    readTime: "5 min read",
    category: "Technology",
    featured: true,
    tags: ["Smart Home", "AI", "IoT"],
    comments: 24,
    views: 1250,
  },
  {
    id: 2,
    title: "Sustainable Architecture: Building for Tomorrow",
    excerpt: "Exploring eco-friendly building practices and their impact on modern real estate development.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
    author: {
      name: "Michael Roberts",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    date: "Mar 14, 2024",
    readTime: "4 min read",
    category: "Architecture",
    tags: ["Sustainability", "Green Building", "Eco-friendly"],
    comments: 18,
    views: 980,
  },
  {
    id: 3,
    title: "Investment Guide: Navigating the Real Estate Market in 2024",
    excerpt: "Expert insights on market trends and investment opportunities in the current real estate landscape.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
    author: {
      name: "Emily Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    date: "Mar 13, 2024",
    readTime: "6 min read",
    category: "Investment",
    featured: true,
    tags: ["Investment", "Market Trends", "Finance"],
    comments: 32,
    views: 1580,
  },
  {
    id: 4,
    title: "Interior Design Trends That Will Dominate 2024",
    excerpt:
      "From minimalist aesthetics to bold color choices, discover the interior design trends that will shape homes this year.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
    author: {
      name: "Jessica Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    },
    date: "Mar 10, 2024",
    readTime: "4 min read",
    category: "Design",
    tags: ["Interior Design", "Home Decor", "Trends"],
    comments: 15,
    views: 870,
  },
]

export const LatestInsights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null)

  const categories = Array.from(new Set(articles.map((article) => article.category)))

  const filteredArticles = activeCategory ? articles.filter((article) => article.category === activeCategory) : articles

  const featuredArticle = articles.find((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => article.id !== featuredArticle?.id)

  const articlesPerPage = 3
  const totalPages = Math.ceil(regularArticles.length / articlesPerPage)
  const displayedArticles = regularArticles.slice(currentPage * articlesPerPage, (currentPage + 1) * articlesPerPage)

  useEffect(() => {
    setCurrentPage(0)
  }, [activeCategory])

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 relative inline-block">
            Latest Insights
            <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gray-900 rounded-full"></span>
          </h2>
          <p className="text-gray-600 mt-3">Stay updated with the latest trends in real estate</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === null
                ? "bg-gray-900 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {featuredArticle && !activeCategory && (
        <div className="mb-10 group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="relative aspect-video md:aspect-auto overflow-hidden">
              <img
                src={featuredArticle.image || "/placeholder.svg"}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                Featured
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredArticle.readTime}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>

                {featuredArticle.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {featuredArticle.comments} Comments
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {featuredArticle.views} Views
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredArticle.author.avatar || "/placeholder.svg"}
                    alt={featuredArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{featuredArticle.author.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {featuredArticle.date}
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-gray-900 group-hover:text-gray-600 transition-colors">
                  <span className="text-sm font-medium">Read Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedArticles.map((article) => (
          <article
            key={article.id}
            className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            onMouseEnter={() => setHoveredArticle(article.id)}
            onMouseLeave={() => setHoveredArticle(null)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {article.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                  Featured
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {article.comments}
                </div>
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {article.views}
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>

              {article.tags && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 2 && (
                    <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                      +{article.tags.length - 2} more
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{article.author.name}</p>
                    <p className="text-xs text-gray-500">{article.date}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-gray-900 hover:text-gray-600 transition-colors">
                  <BookOpen
                    className={`w-4 h-4 transition-all duration-300 ${hoveredArticle === article.id ? "mr-1" : "mr-0"}`}
                  />
                  <span
                    className={`text-sm font-medium overflow-hidden transition-all duration-300 ${
                      hoveredArticle === article.id ? "max-w-20 opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    Read
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedArticles.map((article) => (
          <article
            key={article.id}
            className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            onMouseEnter={() => setHoveredArticle(article.id)}
            onMouseLeave={() => setHoveredArticle(null)}
          >
            <div className="relative overflow-hidden" style={{ height: "150px" }}>
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {article.featured && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">
                  Featured
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="flex items-center bg-white/90 rounded-full px-2 py-0.5 text-xs text-gray-700 shadow-sm">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {article.comments}
                </div>
                <div className="flex items-center bg-white/90 rounded-full px-2 py-0.5 text-xs text-gray-700 shadow-sm">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {article.views}
                </div>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-gray-100 text-gray-900 text-xs rounded-full">{article.category}</span>
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readTime}
                </div>
              </div>

              <h3 className="text-lg font-bold mb-1 text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-3 line-clamp-2 text-sm flex-grow">{article.excerpt}</p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-white shadow-sm"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-xs">{article.author.name}</p>
                    <p className="text-xs text-gray-500">{article.date}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-gray-900 hover:text-gray-600 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  <span
                    className={`text-sm transition-all duration-300 ${
                      hoveredArticle === article.id ? "max-w-20 opacity-100" : "max-w-0 opacity-0"
                    } overflow-hidden`}
                  >
                    Read
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-8 h-8 rounded-full transition-colors ${
                  currentPage === index
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              currentPage === totalPages - 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <button className="group flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg border border-gray-200">
          <span className="font-medium">View All Articles</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

