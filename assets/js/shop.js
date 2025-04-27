document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]))
    }
  
    if (!localStorage.getItem("favorites")) {
      localStorage.setItem("favorites", JSON.stringify([]))
    }
  
    const productCards = document.querySelectorAll(".product-card")
    const addToCartButtons = document.querySelectorAll(".add-to-cart")
    const searchInput = document.querySelector(".search-input")
    const searchButton = document.querySelector(".search-button")
    const categoryButtons = document.querySelectorAll(".category-button")
    const categoryLinks = document.querySelectorAll(".list-group-item-action")
    const priceRange = document.getElementById("priceRange")
    const priceValue = document.getElementById("priceValue")
    const cartBadge = document.querySelector(".badge.bg-danger")
  
    updateCartCount()
  
    function updateAllButtonsForProduct(productName, isInCart) {
      document.querySelectorAll(".add-to-cart").forEach(btn => {
        const btnCard = btn.closest(".product-card") || btn.closest(".modal-content")
        if (btnCard && btnCard.querySelector("h3").textContent === productName) {
          if (isInCart) {
            btn.textContent = "Remove from Cart"
            btn.classList.remove("btn-primary")
            btn.classList.add("btn-success")
          } else {
            btn.textContent = "Add to Cart"
            btn.classList.remove("btn-success")
            btn.classList.add("btn-primary")
          }
        }
      })
    }
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
  
        const productCard = this.closest(".product-card") || this.closest(".modal-content")
        const productName = productCard.querySelector("h3").textContent
        const productPrice = productCard.querySelector(".product-price")
          ? productCard.querySelector(".product-price").textContent
          : productCard.querySelector(".h3.text-primary").textContent
        const productImg = productCard.querySelector("img").src
  
        const cart = JSON.parse(localStorage.getItem("cart"))
        const productIndex = cart.findIndex((item) => item.name === productName)
  
        if (productIndex === -1) {
          cart.push({
            name: productName,
            price: productPrice,
            image: productImg,
            quantity: 1,
          })
  
          showToast(`${productName} added to cart!`, "success")
          updateAllButtonsForProduct(productName, true)
        } else {
          cart.splice(productIndex, 1)
  
          showToast(`${productName} removed from cart!`, "info")
          updateAllButtonsForProduct(productName, false)
        }
  
        localStorage.setItem("cart", JSON.stringify(cart))
        updateCartCount()
      })
    })
  
    initializeButtonStates()
  
    if (searchButton && searchInput) {
      searchButton.addEventListener("click", performSearch)
      searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          performSearch()
        }
      })
    }
  
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        categoryButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")
        filterProductsByCategory(this.textContent)
      })
    })
  
    categoryLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        categoryLinks.forEach((lnk) => lnk.classList.remove("active"))
        this.classList.add("active")
        filterProductsByCategory(this.textContent)
      })
    })
  
    if (priceRange) {
      priceRange.addEventListener("input", function () {
        const maxPrice = this.value
        if (priceValue) {
          priceValue.textContent = `$0 - $${maxPrice}`
        }
        filterProductsByPrice(maxPrice)
      })
    }
  
    const productDetailModal = document.getElementById("productDetailModal")
    let bsModal = null
    
    if (productDetailModal) {
      bsModal = new bootstrap.Modal(productDetailModal, {
        backdrop: true,
        keyboard: true,
        focus: true
      })
      
      productDetailModal.addEventListener('hidden.bs.modal', function () {
        const backdrop = document.querySelector('.modal-backdrop')
        if (backdrop) {
          backdrop.remove()
        }
        
        document.body.classList.remove('modal-open')
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      })
      
      const closeButton = productDetailModal.querySelector('.btn-close')
      if (closeButton) {
        closeButton.addEventListener('click', function() {
          bsModal.hide()
        })
      }
    }
  
    productCards.forEach((card) => {
      card.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart") || e.target.closest(".add-to-cart")) {
          return
        }
  
        const productName = this.querySelector("h3").textContent
        const productPrice = this.querySelector(".product-price").textContent
        const productImg = this.querySelector("img").src
        const productDesc = this.querySelector("p.text-muted").textContent
        const productRating = this.querySelector(".product-rating").innerHTML
  
        const modal = document.getElementById("productDetailModal")
        if (modal) {
          modal.querySelector(".modal-title").textContent = productName
          modal.querySelector("h3").textContent = productName
          modal.querySelector(".product-rating").innerHTML = productRating
          modal.querySelector(".h3.text-primary").textContent = productPrice
          modal.querySelector("img").src = productImg
  
          const cart = JSON.parse(localStorage.getItem("cart"))
          const isInCart = cart.some((item) => item.name === productName)
          const addToCartBtn = modal.querySelector(".add-to-cart")
  
          if (addToCartBtn) {
            if (isInCart) {
              addToCartBtn.textContent = "Remove from Cart"
              addToCartBtn.classList.remove("btn-primary")
              addToCartBtn.classList.add("btn-success")
            } else {
              addToCartBtn.textContent = "Add to Cart"
              addToCartBtn.classList.remove("btn-success")
              addToCartBtn.classList.add("btn-primary")
            }
          }
  
          if (bsModal) {
            bsModal.show()
          }
        }
      })
    })
  
    const navLinks = document.querySelectorAll(".nav-item .nav-link")
    if (navLinks.length > 0) {
      navLinks.forEach(link => {
        if (link.getAttribute('href')) {
          const newLink = link.cloneNode(true)
          link.parentNode.replaceChild(newLink, link)
        }
      })
    }
  
    const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]')
    if (homeLink) {
      homeLink.textContent = "Home"
    }
  
    const playButton = document.getElementById('playButton')
    if (playButton) {
      playButton.addEventListener('click', function (event) {
        event.preventDefault()
        
        const imageContainer = document.getElementById('imageContainer')
        const videoContainer = document.getElementById('videoContainer')
        const videoFrame = document.getElementById('videoFrame')
        
        if (imageContainer) imageContainer.classList.add('hidden')
        if (videoContainer) videoContainer.classList.remove('hidden')
        if (videoFrame) videoFrame.src = "https://www.youtube.com/embed/9no7Q4jYnsI?autoplay=1"
      })
    }
  
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartBadge = document.querySelector(".cart-count-badge");
      
        if (cartBadge) {
          if (cart.length > 0) {
            cartBadge.textContent = cart.length;
            cartBadge.style.display = "inline-block";
          } else {
            cartBadge.textContent = "";
            cartBadge.style.display = "none";
          }
        }
      }
  
    function initializeButtonStates() {
      const cart = JSON.parse(localStorage.getItem("cart"))
  
      addToCartButtons.forEach((button) => {
        const productCard = button.closest(".product-card") || button.closest(".modal-content")
        if (productCard) {
          const productName = productCard.querySelector("h3")?.textContent
          if (productName && cart.some((item) => item.name === productName)) {
            button.textContent = "Remove from Cart"
            button.classList.remove("btn-primary")
            button.classList.add("btn-success")
          }
        }
      })
    }
  
    function performSearch() {
      if (!searchInput) return
      
      const searchTerm = searchInput.value.toLowerCase().trim()
      const products = document.querySelectorAll(".col-md-4.mb-4")
      let foundProducts = false
  
      products.forEach((product) => {
        const productName = product.querySelector("h3")?.textContent.toLowerCase() || ""
        const productDesc = product.querySelector("p.text-muted")?.textContent.toLowerCase() || ""
  
        if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
          product.style.display = "block"
          foundProducts = true
        } else {
          product.style.display = "none"
        }
      })
  
      const notFoundMsg = document.getElementById("not-found-message")
  
      if (!foundProducts && products.length > 0) {
        if (!notFoundMsg) {
          const message = document.createElement("div")
          message.id = "not-found-message"
          message.className = "alert alert-info text-center my-4"
          message.textContent = "No products found matching your search."
  
          const productsContainer = products[0].parentElement
          if (productsContainer) {
            productsContainer.appendChild(message)
          }
        }
      } else if (notFoundMsg) {
        notFoundMsg.remove()
      }
    }
  
    function filterProductsByCategory(category) {
      const products = document.querySelectorAll(".col-md-4.mb-4")
      
      if (!products || products.length === 0) {
        console.log("No products found to filter")
        return
      }
      
      products.forEach((product) => {
        if (category === "All Products") {
          product.style.display = "block"
        } else {
          const productName = product.querySelector("h3")?.textContent.toLowerCase() || ""
          const productDesc = product.querySelector("p.text-muted")?.textContent.toLowerCase() || ""
          const categoryLower = category.toLowerCase()
          
          if (productName.includes(categoryLower) || productDesc.includes(categoryLower)) {
            product.style.display = "block"
          } else {
            product.style.display = "none"
          }
        }
      })
    }
  
    function filterProductsByPrice(maxPrice) {
      const products = document.querySelectorAll(".col-md-4.mb-4")
      
      if (!products || products.length === 0) {
        return
      }
  
      products.forEach((product) => {
        const priceElement = product.querySelector(".product-price")
        if (priceElement) {
          const price = Number.parseFloat(priceElement.textContent.replace("$", ""))
          if (price <= maxPrice) {
            product.style.display = "block"
          } else {
            product.style.display = "none"
          }
        }
      })
    }
  
    function showToast(message, type) {
      if (typeof Toastify === "function") {
        Toastify({
          text: message,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: type === "success" ? "#4CAF50" : "#2196F3",
        }).showToast()
      } else {
        alert(message)
      }
    }
  })    