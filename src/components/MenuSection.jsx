import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setSelectedCategory, setSelectedSubcategory } from "../store/slices/menuSlice"

const MenuSection = ({ categories }) => {
  const dispatch = useDispatch()
  const { selectedCategory, selectedSubcategory } = useSelector((state) => state.menu)
  const allItems = useSelector((state) => state.food.allItems)

  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId))
    dispatch(setSelectedSubcategory(null))
  }

  const handleSubcategoryClick = (subcategory) => {
    dispatch(setSelectedSubcategory(subcategory))
  }

  const filteredItems = allItems.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) {
      return false
    }
    if (selectedSubcategory && item.subcategory !== selectedSubcategory) {
      return false
    }
    return true
  })

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="flex flex-wrap gap-4 mb-6">
          {categories
            .find((cat) => cat.id === selectedCategory)
            .subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => handleSubcategoryClick(subcategory)}
                className={`px-4 py-2 rounded-full ${
                  selectedSubcategory === subcategory ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {subcategory}
              </button>
            ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Link
            to={`/food/${item.id}`}
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default MenuSection

