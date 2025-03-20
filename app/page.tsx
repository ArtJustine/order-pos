"use client"

import Image from "next/image"
import { Search, ChevronDown, Bell, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
// Add these imports at the top of the file
import { CalendarIcon, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Product data for each category
const productData = {
  blizzards: [
    { name: "Oreo Blizzard", image: "/placeholder.svg?height=150&width=150" },
    { name: "Reese's Peanut Buttercup Blizzard", image: "/placeholder.svg?height=150&width=150" },
    { name: "Butterfinger Blizzard", image: "/placeholder.svg?height=150&width=150" },
    { name: "M&M Blizzard", image: "/placeholder.svg?height=150&width=150" },
    { name: "Heath Blizzard", image: "/placeholder.svg?height=150&width=150" },
    { name: "Snickers Blizzard", image: "/placeholder.svg?height=150&width=150" },
    { name: "Royal Reese's Fluttermutter", image: "/placeholder.svg?height=150&width=150" },
    { name: "Royal Ney York Cheesecake", image: "/placeholder.svg?height=150&width=150" },
    { name: "Chocolate Chip Cookie Dough", image: "/placeholder.svg?height=150&width=150" },
    { name: "Mint Oreo Blizzard", image: "/placeholder.svg?height=150&width=150" },
    { name: "Turtle Pecan Blizzard", image: "/placeholder.svg?height=150&width=150" },
    { name: "Choco Brownie Extreme", image: "/placeholder.svg?height=150&width=150" },
  ],
  blended: [
    { name: "Strawberry Smoothie", image: "/placeholder.svg?height=150&width=150" },
    { name: "Mango Pineapple Smoothie", image: "/placeholder.svg?height=150&width=150" },
    { name: "Banana Smoothie", image: "/placeholder.svg?height=150&width=150" },
    { name: "Chocolate Shake", image: "/placeholder.svg?height=150&width=150" },
    { name: "Vanilla Shake", image: "/placeholder.svg?height=150&width=150" },
    { name: "Strawberry Shake", image: "/placeholder.svg?height=150&width=150" },
  ],
  cones: [
    { name: "Vanilla Cone", image: "/placeholder.svg?height=150&width=150" },
    { name: "Chocolate Dipped Cone", image: "/placeholder.svg?height=150&width=150" },
    { name: "Chocolate Cone", image: "/placeholder.svg?height=150&width=150" },
    { name: "Twist Cone", image: "/placeholder.svg?height=150&width=150" },
  ],
  chicken: [
    { name: "4pc Chicken Strip Basket", image: "/placeholder.svg?height=150&width=150" },
    { name: "6pc Chicken Strip Basket", image: "/placeholder.svg?height=150&width=150" },
    { name: "Country Basket", image: "/placeholder.svg?height=150&width=150" },
    { name: "Spicy Chicken Basket", image: "/placeholder.svg?height=150&width=150" },
  ],
  sandwich: [
    { name: "Crispy Chicken Sandwich", image: "/placeholder.svg?height=150&width=150" },
    { name: "Grilled Chicken Sandwich", image: "/placeholder.svg?height=150&width=150" },
    { name: "Deluxe Cheeseburger", image: "/placeholder.svg?height=150&width=150" },
    { name: "Bacon Cheeseburger", image: "/placeholder.svg?height=150&width=150" },
    { name: "Double Cheeseburger", image: "/placeholder.svg?height=150&width=150" },
  ],
  sides: [
    { name: "French Fries", image: "/placeholder.svg?height=150&width=150" },
    { name: "Cheese Curds", image: "/placeholder.svg?height=150&width=150" },
    { name: "Onion Rings", image: "/placeholder.svg?height=150&width=150" },
    { name: "Side Salad", image: "/placeholder.svg?height=150&width=150" },
  ],
}

// Location and employee data
const locationData = {
  Fuquay: [
    "Holly Bailey",
    "Owen Lamontagne",
    "Lachell Rogers",
    "Deandrea Bossmann",
    "Anastasia Raggi",
    "Charli Derosa",
    "Brian W",
    "Ricardo Ayala",
    "Terri Frost",
    "Maria Mendoza",
    "Kelsey Lambalzer",
    "Melody Robinson",
    "Kayla Devito",
    "Reagan Dees",
    "Amelia Stoll",
    "Joseph Corbett",
    "Kimberly bowles",
    "Gunnar Mckinnon",
    "Christian Jacques",
    "Ava Wilson",
    "Jake Whol",
    "Madeline Zarrett",
    "Faith Varela",
    "Reagan Hanson",
    "Oswaldo Ballesteros",
    "Caden Dean",
    "Carmen Ali",
    "Kaylis Franco",
    "Miranda",
    "Brianna Leach-Richardson",
    "Kennith Newkrick",
    "Andy",
    "Kaitlin Villano",
    "Taranea Smith",
  ],
  Morrisville: [
    "Latasha Williams",
    "Viana Jordan",
    "Iyanna Brown",
    "Connor Josefsberg",
    "Fabian C",
    "Alyna Shepherd",
    "Laine",
    "Noah F",
    "Grace",
    "Olivia Caradintuo",
    "Lanie Ceradini",
    "Trinity Seamons",
    "Nataisha Gilliard",
    "Chris",
    "Bobby",
    "Tristan Norment",
    "Mya",
    "Bobby Berry",
  ],
  Centralia: [
    "Vanessa Palomares",
    "Maleia Harmon",
    "Cailee Reid",
    "Gus Robles-Diaz",
    "Bailey Chambers",
    "Christian Phillips",
    "Nick Lock",
    "Kyle Johnstone",
    "Maya Haines",
    "Amelia Venard",
    "Tara Calvert",
    "Jaysten Barada",
    "Daniel Abarta",
    "Brenna Sullivan",
    "Scarlette Hopper",
    "Chelsea Sampson",
    "Tyson Ervin",
    "Jackie Palomares",
    "Sarah Vanhousen",
    "Jesusa Francisco",
    "Kadin Wilson",
    "Brody Turner",
    "Destannhy Hildago",
    "Mirella Vasquez",
    "Joshua Ritzman",
    "Maleia Harmon",
    "David Romero",
    "Jonas Howard",
    "Jillian Clevenger",
    "Megan Sund",
    "Kyle Johnstone",
],

}

// Add this function after the locationData declaration
const getSizeOptions = (category) => {
  switch (category) {
    case "cones":
      return [
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
      ]
    case "chicken":
      return [
        { value: "Both", label: "Fries & Drink" },
        { value: "Fries", label: "Fries Only" },
        { value: "Drink", label: "Drink Only" },
      ]
    case "sandwich":
      return [
        { value: "Single", label: "Single" },
        { value: "Double", label: "Double" },
        { value: "Triple", label: "Triple" },
      ]
    case "sides":
      return [
        { value: "Regular", label: "Regular" },
        { value: "Large", label: "Large" },
      ]
    default:
      return [
        { value: "No", label: "No" },
        { value: "Mini", label: "Mini" },
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
      ]
  }
}

export default function OrderSystem() {
  // Add state for tracking order summary at the top of the OrderSystem component
  const [orderSummary, setOrderSummary] = React.useState({
    itemsNotUpdated: 0,
    upsell: {
      chance: 0,
      offered: 0,
      successful: 0,
    },
    upsize: {
      chance: 0,
      offered: 0,
      successful: 0,
    },
    totalItems: 0,
  })

  // Add state for time dropdowns at the top of the OrderSystem component
  const [startTime, setStartTime] = React.useState("09:00")
  const [endTime, setEndTime] = React.useState("17:00")
  const [showStartTimeDropdown, setShowStartTimeDropdown] = React.useState(false)
  const [showEndTimeDropdown, setShowEndTimeDropdown] = React.useState(false)

  // Add state for location and employee selection
  const [selectedLocation, setSelectedLocation] = React.useState("Fuquay")
  const [showLocationDropdown, setShowLocationDropdown] = React.useState(false)
  const [selectedEmployee, setSelectedEmployee] = React.useState(locationData["Fuquay"][0])
  const [showEmployeeDropdown, setShowEmployeeDropdown] = React.useState(false)

  // Add this after the existing state declarations in OrderSystem
  const [orderItems, setOrderItems] = React.useState([])
  const [eventDate, setEventDate] = React.useState(new Date())
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [employeeFilter, setEmployeeFilter] = React.useState("")
  const [filteredEmployees, setFilteredEmployees] = React.useState(locationData["Fuquay"])

  // Add a new state variable for event count after the other state declarations in OrderSystem
  const [eventCount, setEventCount] = React.useState(0)

  // Add a new state for storing completed events right after the eventCount state
  const [completedEvents, setCompletedEvents] = React.useState([])

  // Add a formValid state after the completedEvents state declaration
  const [formValid, setFormValid] = React.useState(false)

  // Add this useEffect to check if the form is valid whenever dependencies change
  React.useEffect(() => {
    // Form is valid if startTime is set and at least one order item exists
    setFormValid(startTime !== "" && orderItems.length > 0)
  }, [startTime, orderItems])

  // Add a searchTerm state after the activeCategory state
  const [activeCategory, setActiveCategory] = React.useState("blizzards")
  const [searchTerm, setSearchTerm] = React.useState("")

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  // Function to get products for the active category
  const getProducts = () => {
    let products = []

    // If "all" category is selected, combine all products
    if (activeCategory === "all") {
      Object.values(productData).forEach((categoryProducts) => {
        products = [...products, ...categoryProducts]
      })
    } else {
      // Otherwise, get products for the active category
      products = productData[activeCategory] || []
    }

    // Filter products by search term if one exists
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase()
      products = products.filter((product) => product.name.toLowerCase().includes(searchLower))
    }

    return products
  }

  // Check if toppings are applicable for the current category
  const hasToppings = (category) => {
    return ["blizzards", "blended", "cones"].includes(category)
  }

  // Add this function after the hasToppings function in the OrderSystem component

  // Function to handle location change
  const handleLocationChange = (location) => {
    setSelectedLocation(location)
    setSelectedEmployee(locationData[location][0])
    setShowLocationDropdown(false)
  }

  // Function to handle employee selection
  const handleEmployeeChange = (employee) => {
    setSelectedEmployee(employee)
    setShowEmployeeDropdown(false)
  }

  // Replace the updateOrderSummary function with this enhanced version
  const updateOrderSummary = (
    category,
    size,
    quantity,
    offeredLarge,
    offeredOtherSizes,
    offeredToppings,
    largeAgreed,
    otherSizesAgreed,
    toppingsAgreed,
    name,
    additionalInfo = {},
  ) => {
    // Create a new order item
    const newItem = {
      id: Date.now(),
      name: name || "Unknown Item",
      category,
      size,
      quantity,
      toppings: hasToppings(category) && offeredToppings && toppingsAgreed,
      offeredLarge,
      offeredOtherSizes,
      offeredToppings,
      largeAgreed,
      otherSizesAgreed,
      toppingsAgreed,
      ...additionalInfo,
    }

    // Add to order items
    setOrderItems((prev) => [...prev, newItem])

    // Update the summary stats
    setOrderSummary((prev) => {
      const newSummary = { ...prev }

      // Update total items
      newSummary.totalItems += quantity

      // Count add-ons as additional items
      if (category === "chicken" || category === "sandwich") {
        // Count sides as additional items if selected
        if (additionalInfo.selectedSide && additionalInfo.selectedSide !== "None") {
          newSummary.totalItems += quantity
        }

        // Count drinks as additional items if applicable
        if ((category === "chicken" && size === "Both") || size === "Drink") {
          newSummary.totalItems += quantity
        }
      }

      // For items with "No" size
      if (size === "No") {
        newSummary.itemsNotUpdated += quantity

        // Update upsize stats - chance increases for every "No" size item
        newSummary.upsize.chance += quantity

        // If offered large or other sizes, update offered count
        if (offeredLarge || offeredOtherSizes) {
          newSummary.upsize.offered += quantity

          // If customer agreed to large or other sizes, update successful count
          if (largeAgreed || otherSizesAgreed) {
            newSummary.upsize.successful += quantity
          }
        }
      }

      // For all blizzards, update upsell (toppings) stats
      if (category === "blizzards" && hasToppings(category)) {
        // Upsell chance increases for every blizzard
        newSummary.upsell.chance += quantity

        // If toppings were offered, update offered count
        if (offeredToppings) {
          newSummary.upsell.offered += quantity

          // If customer agreed to toppings, update successful count
          if (toppingsAgreed) {
            newSummary.upsell.successful += quantity
          }
        }
      }

      return newSummary
    })
  }

  // Add these functions after the updateOrderSummary function
  // Modify the handleRemoveItem function to update the order summary
  const handleRemoveItem = (itemId) => {
    const itemToRemove = orderItems.find((item) => item.id === itemId)

    if (itemToRemove) {
      // Update the order summary by subtracting this item's statistics
      setOrderSummary((prev) => {
        const newSummary = { ...prev }

        // Decrease total items
        newSummary.totalItems -= itemToRemove.quantity

        // Subtract add-ons as additional items
        if (itemToRemove.category === "chicken" || itemToRemove.category === "sandwich") {
          // Subtract sides as additional items if selected
          if (itemToRemove.selectedSide && itemToRemove.selectedSide !== "None") {
            newSummary.totalItems -= itemToRemove.quantity
          }

          // Subtract drinks as additional items if applicable
          if (itemToRemove.category === "chicken" && (itemToRemove.size === "Both" || itemToRemove.size === "Drink")) {
            newSummary.totalItems -= itemToRemove.quantity
          }
        }

        // For items with "No" size
        if (itemToRemove.size === "No") {
          newSummary.itemsNotUpdated -= itemToRemove.quantity

          // Update upsize stats
          newSummary.upsize.chance -= itemToRemove.quantity

          if (itemToRemove.offeredLarge || itemToRemove.offeredOtherSizes) {
            newSummary.upsize.offered -= itemToRemove.quantity

            if (itemToRemove.largeAgreed || itemToRemove.otherSizesAgreed) {
              newSummary.upsize.successful -= itemToRemove.quantity
            }
          }
        }

        // For blizzards and other items with toppings, update upsell stats
        if (itemToRemove.category === "blizzards" && hasToppings(itemToRemove.category)) {
          // Upsell chance decreases
          newSummary.upsell.chance -= itemToRemove.quantity

          if (itemToRemove.offeredToppings) {
            newSummary.upsell.offered -= itemToRemove.quantity

            if (itemToRemove.toppingsAgreed) {
              newSummary.upsell.successful -= itemToRemove.quantity
            }
          }
        }

        return newSummary
      })
    }

    // Remove the item from orderItems
    setOrderItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const handleEditItem = (itemId) => {
    // For simplicity, we'll just remove the item
    // In a real app, you would open a modal to edit the item
    handleRemoveItem(itemId)
  }

  // Modify the handleSubmitEvent function to increment the event count
  // Modify the handleSubmitEvent function to store the data instead of downloading
  const handleSubmitEvent = () => {
    // Create event data
    const eventData = {
      id: eventCount + 1,
      date: eventDate,
      startTime,
      endTime,
      employee: selectedEmployee,
      location: selectedLocation,
      items: orderItems,
      summary: orderSummary,
      csvData: generateCsvData(),
    }

    // Add to completed events
    setCompletedEvents((prev) => [...prev, eventData])

    // Increment event count
    setEventCount((prevCount) => prevCount + 1)

    // Reset the form
    setOrderItems([])
    setOrderSummary({
      itemsNotUpdated: 0,
      upsell: {
        chance: 0,
        offered: 0,
        successful: 0,
      },
      upsize: {
        chance: 0,
        offered: 0,
        successful: 0,
      },
      totalItems: 0,
    })
  }

  // Add a new function to handle exporting events
  const handleExportEvents = () => {
    if (completedEvents.length === 0) return

    // Combine all CSV data
    let allCsvData = ""
    let headers = ""

    completedEvents.forEach((event, index) => {
      const csvRows = event.csvData.split("\n")

      // For the first event, keep the headers
      if (index === 0) {
        headers = csvRows[0]
        allCsvData = event.csvData
      } else {
        // For subsequent events, just add the data row
        if (csvRows.length > 1) {
          allCsvData += "\n" + csvRows[1]
        }
      }
    })

    // If no headers were found, use the generated headers
    if (!headers && completedEvents.length > 0) {
      allCsvData = generateCsvData()
    }

    // Create a blob and download link
    const blob = new Blob([allCsvData], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `events_summary_${format(new Date(), "yyyy-MM-dd")}.csv`)
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)

    // Clear completed events after export
    setCompletedEvents([])
  }

  const generateCsvData = () => {
    // Create CSV header row based on the format provided
    const headers =
      "Entry#,Event Date,ORDER TIME Start Time,ORDER TIME End Time,Count of Sec,Camera,Why was there No Warm Greeting?,Why didn't they upsell?,Why didnt they repeat the order?,Was Customer Loyalty Offered?,Why was there no Thank you?,Was the app scanned for loylaty?,Video Links,Client Employee,Total Count of Ordered Items,Count of Successful Upsell Items,When they offered the Combo and the customer refused did they offer the drink?,Count of items upsold and not upsized,Count of chances to add an item,Chance to offer (Item),How many were offered an Upsell,Offered Item/s,How many was Successful?,Successful Upsell Item"

    // Create data row
    const data = [
      "1", // Entry#
      format(eventDate, "MM/dd/yyyy"), // Event Date
      `${startTime}:00`, // Start Time with seconds
      `${endTime}:00`, // End Time with seconds
      "", // Count of Sec
      "", // Camera
      "", // Why was there No Warm Greeting?
      "", // Why didn't they upsell?
      "", // Why didnt they repeat the order?
      "", // Was Customer Loyalty Offered?
      "", // Why was there no Thank you?
      "", // Was the app scanned for loylaty?
      "", // Video Links
      selectedEmployee, // Client Employee
      orderSummary.totalItems, // Total Count of Ordered Items
      orderSummary.upsell.successful, // Count of Successful Upsell Items
      "", // When they offered the Combo and the customer refused, did they offer the drink?
      orderSummary.itemsNotUpdated, // Count of items upsold and not upsized
      orderSummary.upsell.chance, // Count of chances to add an item
      "", // Chance to offer (Item)
      orderSummary.upsell.offered, // How many were offered an Upsell
      orderItems
        .filter((i) => i.offeredToppings)
        .map((i) => i.name)
        .join(", "), // Offered Item/s
      orderSummary.upsell.successful, // How many was Successful?
      orderItems
        .filter((i) => i.toppingsAgreed)
        .map((i) => i.name)
        .join(", "), // Successful Upsell Item
    ].join(",")

    return headers + "\n" + data
  }

  // Add this function after the handleLocationChange function
  const handleEmployeeFilterChange = (e) => {
    const value = e.target.value
    setEmployeeFilter(value)

    if (value.trim() === "") {
      setFilteredEmployees(locationData[selectedLocation])
    } else {
      setFilteredEmployees(
        locationData[selectedLocation].filter((emp) => emp.toLowerCase().includes(value.toLowerCase())),
      )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[205px] bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <Image
            src="/logo2.svg"
            alt="Hoptix Logo"
            width={100}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex-1 py-4">
          <div className="px-4 py-2">
            <Button variant="default" className="w-full justify-start bg-blue-900 hover:bg-blue-800">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
                <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
                <path d="M9 21V9" stroke="currentColor" strokeWidth="2" />
              </svg>
              Dashboard
            </Button>
          </div>
          <nav className="mt-2 px-2">
            <div className="px-2 py-2 text-sm flex items-center text-blue-900 font-medium">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
                <path d="M8 10H16" stroke="currentColor" strokeWidth="2" />
                <path d="M8 14H16" stroke="currentColor" strokeWidth="2" />
              </svg>
              Guide
            </div>
            <div className="px-2 py-2 text-sm flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
                <path d="M8 14H16" stroke="currentColor" strokeWidth="2" />
                <path d="M8 18H12" stroke="currentColor" strokeWidth="2" />
              </svg>
              History
            </div>
            <div className="px-2 py-2 text-sm flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M7 12L10 15L17 8" stroke="currentColor" strokeWidth="2" />
              </svg>
              Audits
            </div>
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center text-gray-700 mb-2">
            <Bell className="w-5 h-5 mr-2" />
            <span className="text-sm">Notifications</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Settings className="w-5 h-5 mr-2" />
            <span className="text-sm">Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white p-4 border-b flex items-center gap-4">
          {/* Replace the Event Date div in the top bar with this */}
          <Popover open={showCalendar} onOpenChange={setShowCalendar}>
            <PopoverTrigger asChild>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 cursor-pointer">
                <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm">Event Date: {format(eventDate, "MM/dd/yyyy")}</span>
                <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="single"
                selected={eventDate}
                onSelect={(date) => {
                  setEventDate(date || new Date())
                  setShowCalendar(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          

          {/* Replace the Start Time div with this */}
          <div className="relative">
            <div
              className="flex items-center border rounded-md px-3 py-2 bg-gray-50 cursor-pointer"
              onClick={() => setShowStartTimeDropdown(!showStartTimeDropdown)}
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-sm">Start Time: {startTime}:00</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
            </div>
            {showStartTimeDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white border rounded-md shadow-lg">
                <div className="p-2">
                  <Input
                    type="time"
                    step="1"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mb-2"
                  />
                  <Button size="sm" className="w-full" onClick={() => setShowStartTimeDropdown(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Replace the End Time div with this */}
          <div className="relative">
            <div
              className="flex items-center border rounded-md px-3 py-2 bg-gray-50 cursor-pointer"
              onClick={() => setShowEndTimeDropdown(!showEndTimeDropdown)}
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-sm">End Time: {endTime}:00</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
            </div>
            {showEndTimeDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white border rounded-md shadow-lg">
                <div className="p-2">
                  <Input
                    type="time"
                    step="1"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mb-2"
                  />
                  <Button size="sm" className="w-full" onClick={() => setShowEndTimeDropdown(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Replace the Employee dropdown with this */}
          <div className="relative">
            <div
              className="flex items-center border rounded-md px-3 py-2 bg-gray-50 cursor-pointer"
              onClick={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
                <path d="M6 19C6 15.5 8.5 13 12 13C15.5 13 18 15.5 18 19" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-sm">Employee: {selectedEmployee}</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
            </div>
            {showEmployeeDropdown && (
              <div className="absolute z-10 mt-1 w-64 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2">
                  <Input
                    type="text"
                    placeholder="Search employees..."
                    value={employeeFilter}
                    onChange={handleEmployeeFilterChange}
                    className="mb-2"
                  />
                  {filteredEmployees.map((employee, index) => (
                    <div
                      key={index}
                      className="py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleEmployeeChange(employee)}
                    >
                      {employee}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button variant="outline" className="text-sm">
            Pause Event
          </Button>

          <div className="relative ml-auto">
            <div
              className="flex items-center border rounded-md px-3 py-2 bg-gray-50 cursor-pointer"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M12 12L12 8" stroke="currentColor" strokeWidth="2" />
                <path d="M12 12L16 12" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-sm">Location: {selectedLocation}</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
            </div>
            {showLocationDropdown && (
              <div className="absolute right-0 z-10 mt-1 w-48 bg-white border rounded-md shadow-lg">
                <div className="p-2">
                  {Object.keys(locationData).map((location, index) => (
                    <div
                      key={index}
                      className="py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleLocationChange(location)}
                    >
                      {location}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="bg-white border-b w-full justify-start rounded-none h-auto px-4">
            <TabsTrigger
              value="all"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="blizzards"
              className="px-4 py-2 data-[state=active]:bg-blue-900 data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              Blizzards
            </TabsTrigger>
            <TabsTrigger
              value="blended"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Blended
            </TabsTrigger>
            <TabsTrigger
              value="cones"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Cones
            </TabsTrigger>
            <TabsTrigger
              value="chicken"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Chicken Basket
            </TabsTrigger>
            <TabsTrigger
              value="sandwich"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Sandwich
            </TabsTrigger>
            <TabsTrigger
              value="sides"
              className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Sides
            </TabsTrigger>
            <div className="ml-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-9 w-64 h-8"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </TabsList>
        </Tabs>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-4">
          <div className="flex">
            {/* Products Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {getProducts().map((product, index) => (
                <ProductCard
                  key={index}
                  name={product.name}
                  image={product.image}
                  category={activeCategory}
                  hasToppings={hasToppings(activeCategory)}
                  updateOrderSummary={updateOrderSummary}
                />
              ))}
            </div>

            {/* Replace the Order Summary section with this */}
            <div className="w-64 ml-4">
              <div className="bg-white border rounded-md p-4 mb-4">
                <h3 className="font-medium text-lg mb-4">Event Summary</h3>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Items would and not updated:</span>
                    <span className="font-medium">{orderSummary.itemsNotUpdated}</span>
                  </div>

                  <div className="ml-4">
                    <div className="text-sm text-gray-500 mb-1">Upsell</div>
                    <div className="flex justify-between text-xs text-gray-500 ml-4">
                      <span>Chance:</span>
                      <span>{orderSummary.upsell.chance}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 ml-4">
                      <span>Offered:</span>
                      <span>{orderSummary.upsell.offered}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 ml-4">
                      <span>Successful:</span>
                      <span>{orderSummary.upsell.successful}</span>
                    </div>
                  </div>

                  <div className="ml-4 mt-2">
                    <div className="text-sm text-gray-500 mb-1">Upsize</div>
                    <div className="flex justify-between text-xs text-gray-500 ml-4">
                      <span>Chance:</span>
                      <span>{orderSummary.upsize.chance}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 ml-4">
                      <span>Offered:</span>
                      <span>{orderSummary.upsize.offered}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 ml-4">
                      <span>Successful:</span>
                      <span>{orderSummary.upsize.successful}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between font-medium">
                  <span>Total Ordered Items:</span>
                  <span>{orderSummary.totalItems}</span>
                </div>
              </div>

              <div className="bg-white border rounded-md p-4 mb-4">
                <h3 className="font-medium text-lg mb-4">Order Summary</h3>

                {orderItems.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center py-2">No items added yet</div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {orderItems.map((item) => (
                      <div key={item.id} className="border-b pb-2">
                        <div className="flex justify-between items-start">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleEditItem(item.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          Qty: {item.quantity} • Size: {item.size}
                          {item.toppings && " • Extra Toppings"}
                          {item.selectedSide && item.selectedSide !== "None" && ` • Side: ${item.selectedSide}`}
                          {item.offeredLargeChicken &&
                            ` • ${item.largeChickenAgreed ? "Large Accepted" : "Large Declined"}`}
                          {item.offeredLargeDrink &&
                            ` • ${item.largeDrinkAgreed ? "Large Drink Accepted" : "Large Drink Declined"}`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Replace the Submit Event button in the return section with this new code:
              // Look for the <div className="relative"> containing the Submit Event button
              // and replace it with the following code: */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleSubmitEvent}
                  disabled={!formValid}
                >
                  Submit Event
                </Button>

                <Button
                  className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleExportEvents}
                  disabled={completedEvents.length === 0}
                >
                  Export Events ({completedEvents.length})
                </Button>

                <div className="absolute bottom-[-30px] right-0 bg-blue-100 text-blue-900 px-3 py-1 rounded-md text-sm font-medium flex items-center">
                  <span className="mr-1">Events:</span>
                  <span className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    {eventCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Replace the ProductCard component with this updated version
function ProductCard({ name, image, category, hasToppings, updateOrderSummary }) {
  const [quantity, setQuantity] = React.useState(0)
  const sizeOptions = getSizeOptions(category)
  const [selectedSize, setSelectedSize] = React.useState(sizeOptions[0].value)
  const [showModal, setShowModal] = React.useState(false)
  const [modalType, setModalType] = React.useState("upsell") // "upsell", "toppings", "chicken", "sandwich"
  const [offeredLarge, setOfferedLarge] = React.useState(false)
  const [offeredOtherSizes, setOfferedOtherSizes] = React.useState(false)
  const [offeredToppings, setOfferedToppings] = React.useState(false)

  // Add state for tracking customer agreement in the ProductCard component
  const [largeAgreed, setLargeAgreed] = React.useState(false)
  const [otherSizesAgreed, setOtherSizesAgreed] = React.useState(false)
  const [toppingsAgreed, setToppingsAgreed] = React.useState(false)

  // Add state for chicken basket
  const [offeredLargeChicken, setOfferedLargeChicken] = React.useState(false)
  const [largeChickenAgreed, setLargeChickenAgreed] = React.useState(false)

  // Add state for sandwich
  const [offeredSidesAndDrinks, setOfferedSidesAndDrinks] = React.useState(false)
  const [selectedSide, setSelectedSide] = React.useState("None")
  const [offeredLargeDrink, setOfferedLargeDrink] = React.useState(false)
  const [largeDrinkAgreed, setLargeDrinkAgreed] = React.useState(false)

  React.useEffect(() => {
    if (!showModal) {
      setOfferedLarge(false)
      setOfferedOtherSizes(false)
      setOfferedToppings(false)
      setLargeAgreed(false)
      setOtherSizesAgreed(false)
      setToppingsAgreed(false)
      setOfferedLargeChicken(false)
      setLargeChickenAgreed(false)
      setOfferedSidesAndDrinks(false)
      setSelectedSide("None")
      setOfferedLargeDrink(false)
      setLargeDrinkAgreed(false)
    }
  }, [showModal])

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddClick = () => {
    if (quantity > 0) {
      if (category === "blizzards" && selectedSize === "No") {
        setModalType("upsell")
        setShowModal(true)
      } else if (category === "chicken") {
        setModalType("chicken")
        setShowModal(true)
      } else if (category === "sandwich") {
        setModalType("sandwich")
        setShowModal(true)
      } else if (hasToppings) {
        setModalType("toppings")
        setShowModal(true)
      } else {
        // For categories without toppings, just add the item without a modal
        updateOrderSummary(category, selectedSize, quantity, false, false, false, false, false, false, name)
        console.log(`Added ${name} (${selectedSize}) x${quantity}`)
      }
    }
  }

  // Add a function to handle the Add Item button in the modal
  const handleAddItemFromModal = () => {
    // Include additional information for chicken and sandwich in the order summary
    const additionalInfo = {
      offeredLargeChicken,
      largeChickenAgreed,
      offeredSidesAndDrinks,
      selectedSide,
      offeredLargeDrink,
      largeDrinkAgreed,
    }

    updateOrderSummary(
      category,
      selectedSize,
      quantity,
      offeredLarge,
      offeredOtherSizes,
      offeredToppings,
      largeAgreed,
      otherSizesAgreed,
      toppingsAgreed,
      name,
      additionalInfo,
    )
    setShowModal(false)
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size)
  }

  return (
    <div className="bg-blue-50 rounded-md p-4 flex flex-col">
      <div className="flex justify-center mb-2">
        <Image src={image || "/placeholder.svg"} alt={name} width={150} height={150} className="object-contain" />
      </div>

      <div className="text-center mb-2">
        <Button variant="outline" className="bg-white" onClick={handleAddClick}>
          Add
        </Button>
      </div>

      <div className="text-center font-medium mb-2">{name}</div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={decreaseQuantity}>
          <span>-</span>
        </Button>
        <span className="w-6 text-center">{quantity}</span>
        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={increaseQuantity}>
          <span>+</span>
        </Button>
      </div>

      <div className="flex justify-center gap-1 flex-wrap">
        {sizeOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedSize === option.value ? "default" : "outline"}
            size="sm"
            className={`text-xs px-2 py-1 h-6 rounded-md ${selectedSize === option.value ? "bg-blue-900" : ""}`}
            onClick={() => handleSizeClick(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="text-center text-xs text-gray-500 mt-1">Sizes</div>

      {/* Add Item Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white rounded-lg">
          <DialogHeader className="p-4 flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-blue-100 rounded-md overflow-hidden">
                <Image src={image || "/placeholder.svg"} alt={name} width={64} height={64} className="object-contain" />
              </div>
              <DialogTitle className="text-lg font-medium">{name}</DialogTitle>
            </div>
            <DialogClose className="h-6 w-6 rounded-full">
              <X className="h-4 w-4" />
            </DialogClose>
          </DialogHeader>
          <div className="p-4 space-y-4">
            {modalType === "upsell" ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Did employee offer to Large?</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        id="large-yes"
                        name="large"
                        className="h-4 w-4"
                        onChange={() => setOfferedLarge(true)}
                        checked={offeredLarge}
                      />
                      <Label htmlFor="large-yes" className="text-sm">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        id="large-no"
                        name="large"
                        className="h-4 w-4"
                        onChange={() => setOfferedLarge(false)}
                        checked={!offeredLarge}
                      />
                      <Label htmlFor="large-no" className="text-sm">
                        No
                      </Label>
                    </div>
                  </div>
                </div>

                {offeredLarge && (
                  <div className="flex items-center justify-between ml-6">
                    <span className="text-sm">Did the customer agree?</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          id="large-agree-yes"
                          name="large-agree"
                          className="h-4 w-4"
                          checked={largeAgreed}
                          onChange={() => setLargeAgreed(true)}
                        />
                        <Label htmlFor="large-agree-yes" className="text-sm">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          id="large-agree-no"
                          name="large-agree"
                          className="h-4 w-4"
                          checked={!largeAgreed}
                          onChange={() => setLargeAgreed(false)}
                        />
                        <Label htmlFor="large-agree-no" className="text-sm">
                          No
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm">Did employee offer other sizes including Large</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        id="other-yes"
                        name="other"
                        className="h-4 w-4"
                        onChange={() => setOfferedOtherSizes(true)}
                        checked={offeredOtherSizes}
                      />
                      <Label htmlFor="other-yes" className="text-sm">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        id="other-no"
                        name="other"
                        className="h-4 w-4"
                        onChange={() => setOfferedOtherSizes(false)}
                        checked={!offeredOtherSizes}
                      />
                      <Label htmlFor="other-no" className="text-sm">
                        No
                      </Label>
                    </div>
                  </div>
                </div>

                {offeredOtherSizes && (
                  <div className="flex items-center justify-between ml-6">
                    <span className="text-sm">Did the customer agree?</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          id="other-agree-yes"
                          name="other-agree"
                          className="h-4 w-4"
                          checked={otherSizesAgreed}
                          onChange={() => setOtherSizesAgreed(true)}
                        />
                        <Label htmlFor="other-agree-yes" className="text-sm">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          id="other-agree-no"
                          name="other-agree"
                          className="h-4 w-4"
                          checked={!otherSizesAgreed}
                          onChange={() => setOtherSizesAgreed(false)}
                        />
                        <Label htmlFor="other-agree-no" className="text-sm">
                          No
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Only show toppings question for applicable categories */}
                {hasToppings && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Did employee offer Extra Toppings?</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="toppings-yes"
                            name="toppings"
                            className="h-4 w-4"
                            onChange={() => setOfferedToppings(true)}
                            checked={offeredToppings}
                          />
                          <Label htmlFor="toppings-yes" className="text-sm">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="toppings-no"
                            name="toppings"
                            className="h-4 w-4"
                            onChange={() => setOfferedToppings(false)}
                            checked={!offeredToppings}
                          />
                          <Label htmlFor="toppings-no" className="text-sm">
                            No
                          </Label>
                        </div>
                      </div>
                    </div>

                    {offeredToppings && (
                      <div className="flex items-center justify-between ml-6">
                        <span className="text-sm">Did the customer agree?</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="radio"
                              id="toppings-agree-yes"
                              name="toppings-agree"
                              className="h-4 w-4"
                              checked={toppingsAgreed}
                              onChange={() => setToppingsAgreed(true)}
                            />
                            <Label htmlFor="toppings-agree-yes" className="text-sm">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="radio"
                              id="toppings-agree-no"
                              name="toppings-agree"
                              className="h-4 w-4"
                              checked={!toppingsAgreed}
                              onChange={() => setToppingsAgreed(false)}
                            />
                            <Label htmlFor="toppings-agree-no" className="text-sm">
                              No
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : modalType === "toppings" ? (
              <>
                {/* Only show toppings question for applicable categories */}
                {hasToppings && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Did employee offer Extra Toppings?</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="toppings-only-yes"
                            name="toppings-only"
                            className="h-4 w-4"
                            onChange={() => setOfferedToppings(true)}
                            checked={offeredToppings}
                          />
                          <Label htmlFor="toppings-only-yes" className="text-sm">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="toppings-only-no"
                            name="toppings-only"
                            className="h-4 w-4"
                            onChange={() => setOfferedToppings(false)}
                            checked={!offeredToppings}
                          />
                          <Label htmlFor="toppings-only-no" className="text-sm">
                            No
                          </Label>
                        </div>
                      </div>
                    </div>

                    {offeredToppings && (
                      <div className="flex items-center justify-between ml-6">
                        <span className="text-sm">Did the customer agree?</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="radio"
                              id="toppings-only-agree-yes"
                              name="toppings-only-agree"
                              className="h-4 w-4"
                              checked={toppingsAgreed}
                              onChange={() => setToppingsAgreed(true)}
                            />
                            <Label htmlFor="toppings-only-agree-yes" className="text-sm">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="radio"
                              id="toppings-only-agree-no"
                              name="toppings-only-agree"
                              className="h-4 w-4"
                              checked={!toppingsAgreed}
                              onChange={() => setToppingsAgreed(false)}
                            />
                            <Label htmlFor="toppings-only-agree-no" className="text-sm">
                              No
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : modalType === "chicken" ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Did employee offer Large?</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        id="chicken-large-yes"
                        name="chicken-large"
                        className="h-4 w-4"
                        onChange={() => setOfferedLargeChicken(true)}
                        checked={offeredLargeChicken}
                      />
                      <Label htmlFor="chicken-large-yes" className="text-sm">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        id="chicken-large-no"
                        name="chicken-large"
                        className="h-4 w-4"
                        onChange={() => setOfferedLargeChicken(false)}
                        checked={!offeredLargeChicken}
                      />
                      <Label htmlFor="chicken-large-no" className="text-sm">
                        No
                      </Label>
                    </div>
                  </div>
                </div>

                {offeredLargeChicken && (
                  <div className="flex items-center justify-between ml-6">
                    <span className="text-sm">Did the customer accept?</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          id="chicken-large-accept-yes"
                          name="chicken-large-accept"
                          className="h-4 w-4"
                          checked={largeChickenAgreed}
                          onChange={() => setLargeChickenAgreed(true)}
                        />
                        <Label htmlFor="chicken-large-accept-yes" className="text-sm">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          id="chicken-large-accept-no"
                          name="chicken-large-accept"
                          className="h-4 w-4"
                          checked={!largeChickenAgreed}
                          onChange={() => setLargeChickenAgreed(false)}
                        />
                        <Label htmlFor="chicken-large-accept-no" className="text-sm">
                          No
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : modalType === "sandwich" ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Did employee ask if they want sides and drinks?</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        id="sides-drinks-yes"
                        name="sides-drinks"
                        className="h-4 w-4"
                        onChange={() => setOfferedSidesAndDrinks(true)}
                        checked={offeredSidesAndDrinks}
                      />
                      <Label htmlFor="sides-drinks-yes" className="text-sm">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        id="sides-drinks-no"
                        name="sides-drinks"
                        className="h-4 w-4"
                        onChange={() => setOfferedSidesAndDrinks(false)}
                        checked={!offeredSidesAndDrinks}
                      />
                      <Label htmlFor="sides-drinks-no" className="text-sm">
                        No
                      </Label>
                    </div>
                  </div>
                </div>

                {offeredSidesAndDrinks && (
                  <>
                    <div className="ml-6">
                      <span className="text-sm block mb-2">What side did they choose?</span>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="side-none"
                            name="side-choice"
                            className="h-4 w-4"
                            checked={selectedSide === "None"}
                            onChange={() => setSelectedSide("None")}
                          />
                          <Label htmlFor="side-none" className="text-sm">
                            None
                          </Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="side-fries"
                            name="side-choice"
                            className="h-4 w-4"
                            checked={selectedSide === "French Fries"}
                            onChange={() => setSelectedSide("French Fries")}
                          />
                          <Label htmlFor="side-fries" className="text-sm">
                            French Fries
                          </Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="side-curds"
                            name="side-choice"
                            className="h-4 w-4"
                            checked={selectedSide === "Cheese Curds"}
                            onChange={() => setSelectedSide("Cheese Curds")}
                          />
                          <Label htmlFor="side-curds" className="text-sm">
                            Cheese Curds
                          </Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="side-rings"
                            name="side-choice"
                            className="h-4 w-4"
                            checked={selectedSide === "Onion Rings"}
                            onChange={() => setSelectedSide("Onion Rings")}
                          />
                          <Label htmlFor="side-rings" className="text-sm">
                            Onion Rings
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between ml-6">
                      <span className="text-sm">Did employee ask to go large for drinks?</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="large-drink-yes"
                            name="large-drink"
                            className="h-4 w-4"
                            onChange={() => setOfferedLargeDrink(true)}
                            checked={offeredLargeDrink}
                          />
                          <Label htmlFor="large-drink-yes" className="text-sm">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="large-drink-no"
                            name="large-drink"
                            className="h-4 w-4"
                            onChange={() => setOfferedLargeDrink(false)}
                            checked={!offeredLargeDrink}
                          />
                          <Label htmlFor="large-drink-no" className="text-sm">
                            No
                          </Label>
                        </div>
                      </div>
                    </div>

                    {offeredLargeDrink && (
                      <div className="flex items-center justify-between ml-12">
                        <span className="text-sm">Did the customer agree?</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="radio"
                              id="large-drink-agree-yes"
                              name="large-drink-agree"
                              className="h-4 w-4"
                              checked={largeDrinkAgreed}
                              onChange={() => setLargeDrinkAgreed(true)}
                            />
                            <Label htmlFor="large-drink-agree-yes" className="text-sm">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="radio"
                              id="large-drink-agree-no"
                              name="large-drink-agree"
                              className="h-4 w-4"
                              checked={!largeDrinkAgreed}
                              onChange={() => setLargeDrinkAgreed(false)}
                            />
                            <Label htmlFor="large-drink-agree-no" className="text-sm">
                              No
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : null}

            <div className="flex justify-center mt-4">
              <Button className="bg-gray-300 hover:bg-gray-400 text-black" onClick={handleAddItemFromModal}>
                Add Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

