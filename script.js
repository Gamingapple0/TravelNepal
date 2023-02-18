
  // NavBar component
  const navbar = Vue.component("nav-bar", {
    template: `
      <Transition name='fade-in'>
      <div v-if='show' :class="navbar_classes[0]">
      <!-- Heading to separate the items with space between  -->
      <div :class="navbar_classes[1]">
        <router-link to="/" >{{ brand }}</router-link>
        <!-- Links for the large screens -->
        <div :class="navbar_classes[2]">
          <router-link v-for="link in links" :key="link.name" :to="link.href">{{ link.name }}</router-link>
        </div>
      </div>
      <!-- Links for mobile screens -->
      <Transition name="slide-fade">
        <div v-if="show1" id="hiddenLinks" v-bind:class="{ hidden: showMobileMenu }">
          <transition-group tag="ul" :class="navbar_classes[3]">
            <li v-for="link in links" :key="link.name" :class="navbar_classes[4]">
              <router-link :to="link.href">{{ link.name }}</router-link>
            </li>
          </transition-group>
        </div>
      </Transition>
      <!-- Hamburger icon -->
      <a href="javascript:void(0);" :class="navbar_classes[5]" @click="toggleMobileMenu">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    </Transition>
        `,
    props: {
      brand: {
        type: String,
        required: true,
      },
      links: {
        type: Array,
        required: false,
      },
    },
    data() {
      return {
        showMobileMenu: false,
        show: false,
        show1: false,
        navbar_classes: [
          "topnav",
          "heading",
          "links",
          "list",
          "list-item",
          "icon",
        ],
      };
    },
    computed: {
      isMobile: function () {
        return window.innerWidth < 768;
      },
    },
    watch: {
      showMobileMenu: function (newVal) {
        this.show1 = newVal;
      },
    },
    methods: {
      toggleMobileMenu() {
        this.show1 = !this.show1;
      },
    },
    mounted() {
      this.show = true;
    },
  });
  // Hero component
  const home = Vue.component("home", {
    template: `

              <section :class="home_classes[0]">
                  <div :class="home_classes[1]" :style="backgroundImg"></div>
                  <Transition name="slide-fade">
                      <div v-if="show">
                      <div :class="home_classes[2]">
                        <h1>{{ title }}</h1>
                        <h3>{{ tagline }}</h3>
                        <router-link :to="packageLink" :class="home_classes[3]">Packages</router-link>
                    </div>
                      </div>
                  </Transition>
              </section>


              `,
    data() {
      return {
        heroBackgroundStyle: {
          color: "blue",
          fontSize: "13px",
        },
        show: false,
        home_classes: [
          "hero",
          "heroBackgroundImage",
          "hero-content-area",
          "btn",
        ],
      };
    },
    computed: {
      backgroundImg: function () {
        return { "background-image": "url(" + this.heroBackgroundImage + ")" };
      },
      title: function () {
        return this.$store.state.title;
      },
    },
    props: {
      tagline: {
        type: String,
        required: false,
        default: "Unmissable Adventure Tours Around Nepal",
      },
      packageLink: {
        type: String,
        required: false,
        default: "/packages",
      },
      heroBackgroundImage: {
        type: String,
        required: false,
        default:
          "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98c2d910abcc9bb04fcb180f6a45e407&dpr=2&auto=format&fit=crop&w=767&h=485&q=60&cs=tinysrgb",
      },
    },
    mounted() {
      this.show = true;
    },
  });

  // LoginForm component
  const login = Vue.component("login-form", {
    template: `
    <section class="login-form-section">
    <Transition name="slide-fade">
      <div v-if="show" class="login-container">
        <h3 class="title">{{ greeting }}</h3>
        <!-- Login Form -->
        <form action="" @submit.prevent="login">
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            name=""
            id=""
          />
          <input type="password" placeholder="Password" v-model="password" />
          <button :style="{background:validity}" :class="submitButtonClass">Login</button>
        </form>
        <!-- Error message -->
        <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
      </div>
    </Transition>
    </section>

        `,
    props: {
      greeting: {
        type: String,
        required: false,
        default: "Welcome",
      },
    },
    computed: {
      isValidForm: function () {
        return this.username && this.password;
      },
      submitButtonClass: function () {
        return this.isValidForm ? "submit-button" : "submit-button-disabled";
      },
      validity: function () {
        return this.isValidForm ? "" : "gray";
      },
      loginSucess:function(){
        return this.$store.state.logSucess
      }
    },
    watch: {
      username: function () {
        this.isForm = this.username && this.password;
      },
      password: function () {
        this.isForm = this.username && this.password;
      },
      loginSucess: function () {
        console.log("Login");
        if (this.$store.state.logSucess) {
          console.log('suc')
          window.location.href += "/sucess";
        }
      },
    },
    data() {
      return {
        username: "",
        password: "",
        hasError: false,
        errorMessage: "",
        show: false,
        isForm: false,
      };
    },
    methods: {
      login() {
        // Validate the form
        if (this.isValidForm) {
          this.hasError = true;
          this.errorMessage = "Error: Please enter the correct details";
          for (let i = 0; i < this.$store.state.users.length; i++) {
            if (this.$store.state.users[i].username == this.username) {
              if (this.$store.state.users[i].password == this.password) {
                console.log("aaa");
                this.$store.state.logSucess = true;
              }
            }
          }
          return;
        }
        // Send a request to the server to log the user in
        // Assuming the server sends a response with a success or error message
      },
    },
    mounted() {
      this.show = true;
      if (this.$store.state.logSucess) {
          window.location.href += "/sucess";
        }
    },
  });

  // RegistrationForm component
  const register = Vue.component("register-form", {
    template: `
    <section class="register-form-section">
    <Transition name="slide-fade">
      <div v-if="show" class="register-container">
        <h3 class="title">Register</h3>
        <!-- Register Form -->
        <form action="" @submit.prevent="register">
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            name=""
            id=""
          />
          <input type="password" placeholder="Password" v-model="password" />
          <input type="password" placeholder="Confirm Password" v-model="confirmPassword" />
          <button :style="{background:validity}" :class="submitButtonClass">Register</button>
        </form>
        <!-- Error message -->
        <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
      </div>
    </Transition>
    </section>

        `,
    computed: {
      isValidForm: function () {
        return this.username && this.password;
      },
      isPassValid: function () {
        return (
          this.password == this.confirmPassword &&
          this.password &&
          this.confirmPassword
        );
      },
      submitButtonClass: function () {
        return this.isValidForm && this.isPassValid
          ? "submit-button"
          : "submit-button-disabled";
      },
      validity: function () {
        return this.isValidForm && this.isPassValid ? "" : "gray";
      },
    },
    watch: {
      username: function () {
        this.isForm = this.username && this.password;
      },
      password: function () {
        this.isForm = this.username && this.password;
      },
      registered: function () {
        if (this.registered) {
          window.location.href = window.location.href.replace(
            "register",
            "login"
          );
        }
      },
    },
    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        hasError: false,
        errorMessage: "",
        show: false,
        isForm: false,
        registered: false,
      };
    },
    methods: {
      register() {
        // Validate the form
        if (this.isPassValid && this.isValidForm) {
          this.$store.state.users.push({
            username: this.username,
            password: this.password,
          });
          this.registered = true;
          return;
        }

        console.log(this.$store.state.users);
        this.hasError = true;
        this.errorMessage = "Please enter your appropriate details";
        return;
        // Send a request to the server to log the user in
        // Assuming the server sends a response with a success or error message
        // if (response.success) {
        // // Redirect the user
        // window.location.href = '/';
        // } else {
        // this.hasError = true;
        // this.errorMessage = response.error;
        // }
      },
    },
    mounted() {
      this.show = true;
    },
  });

  //AboutUs component
  const about = Vue.component("about", {
    template: `
      <Transition name="slide-fade">
        <section v-if='show' class="about-us">
          <h3 class="title">About Us</h3>
          <hr />
          <!-- Information About Us -->
          <div :class="aboutObj(index)" ref="info_block" v-for="(info, index) in infos" :key="info.title">
            <div>
              <img :src="info.image" alt="" class="flex-img" />
            </div>
            <div class="flex-text">
              <h5>{{ info.title }}</h5>
              <p>{{ info.description }}</p>
            </div>
          </div>
        </section>
        </Transition>
      `,
    data() {
      return {
        show: false,
      };
    },
    props: {
      infos: {
        type: Array,
        required: true,
      },
    },
    methods: {
      aboutObj(index) {
        return {
          "flex-box": true,
          "flex-rev": index % 2 == 1,
        };
      },
    },
    mounted() {
      // this.$refs.info_block[0].style.color = 'white'
      this.show = true;
    },
  });

  //Reviews component
  const reviews = Vue.component("reviews", {
    template: `
        <section id="testimonials">
        <!-- Review Form -->
        <div class="reviews-container">
          <h3 class="title">Leave Us A Review!</h3>
          <form @submit.prevent="submitReview">
            <input id="review-input-name" type="text" placeholder="Name" v-model="name" />
            <input id="review-input-email" type="email" placeholder="Email" v-model="email" />
            <textarea id="review-textarea"
              class="review"
              :style="{font: 'normal large sans-serif'}"
              v-model="review"
              placeholder="Review..."
              cols="30"
              rows="10"
            ></textarea>
            <button>Submit</button>
          </form>
        </div>
        <!--heading--->
        <div class="testimonial-heading">
          <h3 class="title">Reviews</h3>
        </div>
        <!--List of Reviews------>
    <Transition-group :style="{width: transition_review}" tag="div" name="list">
      <div class="testimonial-box-container" v-for="review in reviews" :key="review.id">
        <div class="testimonial-box">
          <!-- top -->
          <div class="box-top">
            <!--profile----->
            <div class="profile">
              <!--img---->
              <div class="profile-img">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-512.png"
                />
              </div>
              <!--name-and-username-->
              <div class="name-user">
                <strong>{{ review.name }}</strong>
                <span>{{ review.email }}</span>
              </div>
            </div>
          </div>
          <!-- Review comment -->
          <div class="client-comment">
            <p>{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </Transition-group>
      </section>
        `,
    data() {
      return {
        name: "",
        email: "",
        review: "",
        reviews: [
          {
            name: "Mike Ox",
            email: "mikeox@sugondese.com",
            comment: "W site",
          },
        ],
        id: -1,
        transition_review: "inherit",
      };
    },
    methods: {
      submitReview() {
        const review_object = {
          name: this.name,
          email: this.email,
          comment: this.review,
          id: this.id + 1,
        };
        this.reviews.push(review_object)
      },
    },
    mounted() {},
  });

  const about_us = Vue.component("about-us", {
    template: `
      <div>
        <about :infos="[{description:'As a bachelor of computer science student, I am excited to introduce my latest project, Travel Nepal. This web application is designed for tourists who are looking to explore Nepal in an organized and convenient way. The goal of this project is to make it easy for tourists to find and book packages for trips to Nepal, without having to navigate through multiple websites and platforms.',title:'Introduction',image:'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98c2d910abcc9bb04fcb180f6a45e407&dpr=2&auto=format&fit=crop&w=767&h=485&q=60&cs=tinysrgb'},{description:'The goal of Travel Nepal is to provide a one-stop-shop for all of your travel needs. From finding the perfect package to book, to providing detailed information about each destination, we strive to make the planning process as seamless as possible. With user-friendly navigation and easy-to-use booking features, Travel Nepal is the perfect tool for anyone looking to explore the wonders of Nepal.',title:'My Goals and Visions',image:'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98c2d910abcc9bb04fcb180f6a45e407&dpr=2&auto=format&fit=crop&w=767&h=485&q=60&cs=tinysrgb'}]"></about>
        <reviews></reviews>
      </div>

      `,
  });
  //Packages component
  const packages = Vue.component("packages", {
    template: `
        <section class="packages">
      <Transition name="slide-fade">
        <h3 v-if='show' class="title">Tour Packages</h3>
        <p>We offer a variety of moutaineering packages. Wheter you've climbed Everest, or don't even know what a mountain is, we've got the perfect vacation for you.</p>
        <hr>
      </Transition>

        <!-- Package Cards Container -->

        <Transition name="slide-fade">
    <div v-if="show" class="pack-container">
      <!-- Package Card -->
      <div  class="card" v-for="package in packages" :key="package.id">

        <div class="contentBx">
          <h2>{{ package.name }}</h2>
          <div class="size">
            <h3>Length :</h3>
            <span v-for="detail in package.details" :key="detail.id">{{ detail.days }}</span>
          </div>
          <div class="color">
            <h3>Price :</h3>
            <span v-for="detail in package.details" :key="detail.id"><b>$</b>{{ detail.price }}</span>
          </div>
            <router-link :to="package_link(package.id)" id="buy" @click.prevent="purchasePackage(package)">Buy Now</router-link>
        </div>
      </div>
    </div>
  </Transition>
      </section>
        `,
    data() {
      return {
        show: false,
      };
    },
    methods: {
      purchasePackage(package) {
        // Send an API request to purchase the selected package
        console.log(`Purchasing package: ${package.name}`);
      },
      package_link: function (id) {
        return "packages/" + id;
      },
    },
    computed: {
      packages: function () {
        return this.$store.state.packages;
      },
    },
    mounted() {
      this.show = true;
    },
  });

  //Carousel Component
  const carousel = Vue.component("carousel", {
    template: `
      <div id="carousel-main">
        <div class="slideshow-container">
        <div :class="carousel_classes" v-for="(slide, index) in slides" :key="index">
          <div v-if="show(index)">
            <div class="numbertext">{{ index + 1 }} / {{ slides.length }}</div>
            <img :src="slide.src" :style="{width: carousel_img_width + '%'}">
          </div>
        </div>

        <a class="prev" @click="prevSlide">❮</a>
        <a class="next" @click="nextSlide">❯</a>
      </div>

      <div :style="{'text-align':carousel_dot_allignment}">
        <span class="dot" v-for="(slide, index) in slides" :key="index" @click="currentSlide(index)" :class="{ 'active': currentIndex === index }"></span>
      </div>
      </div>
      `,
    props: {
      slides: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        currentIndex: 0,
        carousel_classes: ["mySlides", "fade"],
        carousel_img_width: 100,
        carousel_dot_allignment: "center",
      };
    },
    methods: {
      show(index) {
        if (this.currentIndex == index) {
          return true;
        }
        return false;
      },
      prevSlide() {
        console.log(this.currentIndex);
        this.currentIndex--;
        if (this.currentIndex < 0) {
          this.currentIndex = this.slides.length - 1;
        }
      },
      nextSlide() {
        console.log("next");
        this.currentIndex++;
        if (this.currentIndex >= this.slides.length) {
          this.currentIndex = 0;
        }
      },
      currentSlide(index) {
        console.log("cur");
        this.currentIndex = index;
      },
    },
  });

  //Locations Component

  const locations = Vue.component("locations", {
    template: `
      <div id="locations-container">
      <ol id="locations-marker">
        <li v-for="i in stops" ></li>
      </ol>
      <div id="locations-text">
        <li v-for="stop in stops">{{stop}}</li>
      </div>
    </div>
      `,
    props: {
      stops: {
        type: Array,
        required: true,
      },
    },
  });

  //Package Details Component

  const details = Vue.component("package-detail", {
    template: `
      <div>
        <Transition name="slide-fade">
          <div v-if="show" id="package-info-wrapper">
          <carousel :slides="getImages"></carousel>
            <div id="package-main">
              <h1 class="destination-name">{{ package.name }}</h1>
              <form @submit.prevent="handleSubmit">
                <input required type="date" v-model="selectedDate">
                <div class="all-package-info">
                  <div v-for="package_detail in package.details" class="package-info">
                    <p class="package-duration">{{ package_detail.days }} days</p>
                    <button type="button" @click="selectedPrice(package_detail.price, package_detail.days)"  :class="details_button_classes">$ {{ package_detail.price }}</button>
                  </div>
                </div>
                <button type="submit"class="package-details-button">Buy</button>
              </form>
            </div>
          </div>
        </Transition>
          <div class="package-itenary">
            <h2>Itenary</h2>
            <p>{{ getItenary }}</p>
          <locations :stops="getLocations"></locations>
            <iframe :src="getIframeSrc" frameborder="0" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
    `,
    data() {
      return {
        selectedDate: null,
        price: '',
        days: null,
        show: false,
        details_button_classes: ["package-price", "package-details-button"],
      };
    },
    methods: {
      formValidator(){
        if (!this.price){
          alert('Please Select Price')
          return false
        }
        return true
      },
      handleSubmit(event) {
        if(this.formValidator()){
          var uid = this.$store.state.counter
        var new_entry = {id:uid,name:this.package.name, date:this.selectedDate, price:this.price, days:this.days}
        this.$store.state.user_packages.push(new_entry)
        this.$store.state.counter ++
        window.location.href = window.location.href.split('/').slice(0,-2).join('/')
        }
        // Add logic to handle form submission
      },
      selectedPrice(price, days) {
        this.price = '$' + price;
        this.days = days
      },
    },
    computed: {
      package: function () {
        return this.$store.state.packages[this.$route.params.id];
      },
      getLocations: function () {
        return this.$store.state.packages[this.$route.params.id].locations;
      },
      getItenary: function () {
        return this.$store.state.packages[this.$route.params.id].itenary;
      },
      getImages: function () {
        return this.$store.state.packages[this.$route.params.id].images;
      },
      getIframeSrc: function () {
        return this.$store.state.packages[this.$route.params.id].iframeSrc;
      },
    },
    mounted() {
      this.show = true;
    },
  });

  // Login packages
  const login_packages = Vue.component("login-package", {
    template: `
    <div>
      <h3 class="title">Your Bookings</h3>
    <hr/>
    <div class="booking-list" v-for="booking in bookings" :key="booking.id">
        <div class="booking" >
            <span>Package: {{getTitle(booking.id)}}</span>
            <span>Date: {{getDate(booking.id)}} </span>
            <span>Price: {{getPrice(booking.id)}} </span>
            <span>Days: {{getDays(booking.id)}} days </span>
            <button class="remove" @click="removed(booking.id)">Cancel Booking</button>
        </div>
    </div>
    <div style="width:fit-content; margin:auto">
      <button style='width:300px' class="package-details-button" @click="logOff()">Log Off</button>  
    </div>
    
      </div>
    `,
    data() {
      return {
        
      };
    },
    computed:{
      bookings:function(){
        return this.$store.state.user_packages
      }
    },
    methods: {
      getTitle(id){
        console.log(this.$store.state.user_packages.find(user => user.id === id).name)
        return this.$store.state.user_packages.find(user => user.id === id).name
        // return this.$store.state.user_packages.find(user => user.id === id)

      },
      getDate(id){
        return this.$store.state.user_packages.find(user => user.id === id).date
      },
      getPrice(id){
        return this.$store.state.user_packages.find(user => user.id === id).price
      },
      getDays(id){
        return this.$store.state.user_packages.find(user => user.id === id).days
      },
      removed(id){
        const index = this.$store.state.user_packages.findIndex(p => p.id === id);
        this.$store.state.user_packages.splice(index, 1);
        // this.$store.state.user_packages = this.$store.state.user_packages.filter(p => p.id !== id)
      },
      logOff(){
        this.$store.state.logSucess = false
        window.location.href = window.location.href.replace(
            "sucess",
            ""
          );
      }
    }
  });

  //Routes and Router

  const routes = [
    { path: "/", component: home },
    { path: "/about", component: about_us },
    { path: "/packages", component: packages },
    { path: "/packages/:id", component: details },
    { path: "/login", component: login },
    { path: "/login/sucess", component: login_packages },
    { path: "/register", component: register },
  ];

  const router = new VueRouter({
    routes,
  });

  Vue.use(VueRouter);

  // Global Store

  const store = new Vuex.Store({
    state: {
      users: [
        {
          username: "Admin",
          password: "123",
        },
      ],
      title: "Travel Nepal",
      counter:0,
      logSucess:false,
      user_packages: [],
      packages: [
        {
          id: 0,
          name: "Mt Everest Trek",
          details: [
            { id: 1, days: 7, price: 200 },
            { id: 2, days: 10, price: 300 },
            { id: 3, days: 14, price: 400 },
            { id: 4, days: 30, price: 700 },
          ],
          itenary:
            "Start and end in Kathmandu! With the Hiking & Trekking tour Everest Base Camp Trek, you have a 15 days tour package taking you through Kathmandu, Nepal and 11 other destinations in Nepal. Everest Base Camp Trek includes accommodation in a hotel as well as an expert guide, transport and more.",
          locations: [
            "Day 1: Kathmandu",
            "Day 2: Kathmandu/Phakding",
            "Day 3: Phakding/Namche Bazaar",
            "Day 4: Namche Bazaar",
            "Day 5: Namche Bazaar to Tengboche",
            "Day 6: Tengboche to Dingboche",
            "Day 7: Dingboche",
          ],
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14092.755158992184!2d86.91622032942973!3d27.98811987282146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e854a215bd9ebd%3A0x576dcf806abbab2!2sMt%20Everest!5e0!3m2!1sen!2sau!4v1673578404296!5m2!1sen!2sau",
          images: [
            {
              src: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98c2d910abcc9bb04fcb180f6a45e407&dpr=2&auto=format&fit=crop&w=767&h=485&q=60&cs=tinysrgb",
              caption: "Mountains",
            },
            {
              src: "https://cdn.tourradar.com/s3/tour/1500x800/5535_d468ba1d.jpg",
              caption: "Mountains View",
            },
            {
              src: "https://cdn.tourradar.com/s3/tour/1500x800/5535_1ba53e9e.jpg",
              caption: "Mountains With Snow",
            },
          ],
        },
        {
          id: 1,
          name: "Buddhist Darshan Tour",
          details: [
            { id: 1, days: 7, price: 200 },
            { id: 2, days: 10, price: 300 },
            { id: 3, days: 14, price: 400 },
            { id: 4, days: 30, price: 700 },
          ],
          itenary:
            "Start and end in Kathmandu! With the In-depth Cultural tour Buddhist Darshan Tour - 10 Days, you have a 10 days tour package taking you through Kathmandu, Nepal and 6 other destinations in Nepal. Buddhist Darshan Tour - 10 Days includes accommodation in a hotel as well as an expert guide, meals, transport and more.",
          locations: [
            "Day 1: Arrive in Kathmandu",
            "Day 2: Kathmandu",
            "Day 3: Pokhara",
            "Day 4: Pokhara",
            "Day 5: Lumbini",
            "Day 6: Lumbini",
            "Day 7: Chitwan",
          ],
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d905054.7111148441!2d83.2080815988243!3d27.613056259041738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994439ad1ca5a8d%3A0x6c5e40f75e1f474f!2sChitawan%2C%20Nepal!5e0!3m2!1sen!2sau!4v1673578235045!5m2!1sen!2sau",
          images: [
            {
              src: "https://cdn.tourradar.com/s3/tour/1500x800/118178_5e0539263bc73.jpg",
              caption: "Stupa",
            },
            {
              src: "https://cdn.tourradar.com/s3/tour/1500x800/118178_5e0538da2e597.jpg",
              caption: "Stupa 2",
            },
            {
              src: "https://cdn.tourradar.com/s3/tour/1500x800/118178_5e0538da41bd3.jpg",
              caption: "Stupa 3",
            },
          ],
        },
        {
          id: 2,
          name: "Chitwan Wildlife Safari",
          details: [
            { id: 1, days: 7, price: 200 },
            { id: 2, days: 10, price: 300 },
            { id: 3, days: 14, price: 400 },
            { id: 4, days: 30, price: 700 },
          ],
          itenary:
            "Start and end in Kathmandu! With the Wildlife tour Nepal Wildlife Adventure Tour, you have a 8 days tour package taking you through Kathmandu, Nepal and 2 other destinations in Nepal. Nepal Wildlife Adventure Tour includes accommodation, flights, an expert guide, meals, transport and more.",
          locations: [
            "Day 1: Arrive Kathmandu",
            "Day 2: Kathmandu Sightseeing",
            "Day 3: Drive Kathmandu-Chitwan (185 km, 6 hrs drive)",
            "Day 4: Full day Jungle activities",
            "Day 5: Drive to Pokhara (175 km, 5 hrs drive)",
            "Day 6: In Pokhara",
            "Day 7: Fly Pokhara-Kathmandu (25 min flight)",
          ],
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112488.40702091574!2d83.88657787672788!3d28.229704559053705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara%2C%20Nepal!5e0!3m2!1sen!2sau!4v1673578364902!5m2!1sen!2sau",
          images: [
            {
              src: "https://cdn.tourradar.com/s3/tour/1500x800/163558_4c821e81.jpg",
              caption: "Caption Text",
            },
            {
              src: "https://cdn.tourradar.com/s3/tour/1500x800/163558_1feee429.jpg",
              caption: "Caption Two",
            },
            {
              src: "https://cdn.tourradar.com/s3/tour/1500x800/163558_57dc6d4a.jpg",
              caption: "Caption Three",
            },
          ],
        },
      ],
    },
  });
  Vue.config.silent = true

  var main = new Vue({
    el: "#app",
    router,
    store,
  });

console.log('script running')
