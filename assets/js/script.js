// Declare bootstrap variable
var bootstrap = bootstrap; // Declare bootstrap variable

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })
      }
    })
  })

  // Form validation for contact form
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      let isValid = true
      const requiredFields = contactForm.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("is-invalid")
        } else {
          field.classList.remove("is-invalid")
          field.classList.add("is-valid")
        }
      })

      // Email validation
      const emailField = contactForm.querySelector("#email")
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(emailField.value)) {
          isValid = false
          emailField.classList.add("is-invalid")
        }
      }

      if (isValid) {
        // Show success message
        const formContainer = contactForm.parentElement
        formContainer.innerHTML = `
                    <div class="text-center py-5">
                        <div class="mb-4">
                            <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                        </div>
                        <h3>Thank You!</h3>
                        <p class="lead">Your message has been sent successfully.</p>
                        <p>We'll get back to you as soon as possible.</p>
                    </div>
                `

        // In a real application, you would send the form data to a server here
        console.log("Form submitted successfully")
      }
    })
  }

  // Modal form validation
  const subscribeModal = document.getElementById("subscribeModal")
  if (subscribeModal) {
    const modalForm = subscribeModal.querySelector("form")
    const submitButton = subscribeModal.querySelector(".btn-primary")

    submitButton.addEventListener("click", () => {
      let isValid = true
      const requiredFields = modalForm.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("is-invalid")
        } else {
          field.classList.remove("is-invalid")
          field.classList.add("is-valid")
        }
      })

      // Email validation
      const emailField = modalForm.querySelector("#email")
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(emailField.value)) {
          isValid = false
          emailField.classList.add("is-invalid")
        }
      }

      if (isValid) {
        // Show success message
        const modalBody = modalForm.parentElement
        modalBody.innerHTML = `
                    <div class="text-center py-4">
                        <div class="mb-4">
                            <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                        </div>
                        <h3>Thank You!</h3>
                        <p class="lead">Your subscription request has been received.</p>
                        <p>One of our representatives will contact you shortly to complete the setup process.</p>
                    </div>
                `

        // Change the modal footer button
        const modalFooter = subscribeModal.querySelector(".modal-footer")
        modalFooter.innerHTML = `
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                `

        // In a real application, you would send the form data to a server here
        console.log("Subscription form submitted successfully")
      }
    })
  }

  // Add animation to features on scroll
  const animateOnScroll = (elements, className) => {
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const triggerBottom = window.innerHeight * 0.8

      if (elementTop < triggerBottom) {
        element.classList.add(className)
      }
    })
  }

  // Animate features
  const featureBoxes = document.querySelectorAll(".feature-box")
  if (featureBoxes.length > 0) {
    featureBoxes.forEach((box) => {
      box.style.opacity = "0"
      box.style.transform = "translateY(20px)"
      box.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })

    const animateFeatures = () => {
      featureBoxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top
        const triggerBottom = window.innerHeight * 0.8

        if (boxTop < triggerBottom) {
          box.style.opacity = "1"
          box.style.transform = "translateY(0)"
        }
      })
    }

    // Run on load
    animateFeatures()

    // Run on scroll
    window.addEventListener("scroll", animateFeatures)
  }

  // Animate timeline items
  const timelineItems = document.querySelectorAll(".timeline-item")
  if (timelineItems.length > 0) {
    const animateTimeline = () => {
      timelineItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top
        const triggerBottom = window.innerHeight * 0.8

        if (itemTop < triggerBottom) {
          item.classList.add("visible")
        }
      })
    }

    // Run on load
    animateTimeline()

    // Run on scroll
    window.addEventListener("scroll", animateTimeline)
  }

  // Animate sections on scroll
  const animateSections = () => {
    // Animate section titles
    animateOnScroll(document.querySelectorAll(".section-title"), "fade-in")
    
    // Animate testimonials
    animateOnScroll(document.querySelectorAll(".testimonial"), "slide-in-left")
    
    // Animate tech cards
    animateOnScroll(document.querySelectorAll(".tech-card"), "slide-in-right")
    
    // Animate team members
    animateOnScroll(document.querySelectorAll(".team-member"), "fade-in")
    
    // Animate product cards
    animateOnScroll(document.querySelectorAll(".product-card"), "slide-in-up")
    
    // Animate provider cards
    animateOnScroll(document.querySelectorAll(".provider-card"), "slide-in-up")
  }

  // Run animations on load
  animateSections()
  
  // Run animations on scroll
  window.addEventListener("scroll", animateSections)

  // Product quantity buttons
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  if (quantityBtns.length > 0) {
    quantityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const currentValue = parseInt(input.value);
        
        if (this.classList.contains('minus') && currentValue > 1) {
          input.value = currentValue - 1;
        } else if (this.classList.contains('plus')) {
          input.value = currentValue + 1;
        }
      });
    });
  }

  // Add to cart animation
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  if (addToCartBtns.length > 0) {
    addToCartBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show added to cart message
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="bi bi-check-lg"></i> Added to Cart';
        this.classList.add('btn-success');
        this.classList.remove('btn-primary');
        
        // Reset button after 2 seconds
        setTimeout(() => {
          this.innerHTML = originalText;
          this.classList.remove('btn-success');
          this.classList.add('btn-primary');
        }, 2000);
        
        // Update cart count (this would be more sophisticated in a real app)
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          const currentCount = parseInt(cartCount.textContent);
          cartCount.textContent = currentCount + 1;
          
          // Animate the cart count
          cartCount.classList.add('cart-count-animation');
          setTimeout(() => {
            cartCount.classList.remove('cart-count-animation');
          }, 500);
        }
      });
    });
  }
})
document.getElementById('playButton').addEventListener('click', function (event) {
    event.preventDefault();

    document.getElementById('imageContainer').classList.add('hidden');
    document.getElementById('videoContainer').classList.remove('hidden');

    document.getElementById('videoFrame').src = "https://www.youtube.com/embed/9no7Q4jYnsI?autoplay=1";
  });