<template>
  <main>
    <div class="a-spacing-large"></div>
    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="a-size-large a-spacing-none a-text-normal">
            All products
          </h1>
          <div class="a-spacing-large"></div>
          <!-- BUTTON -->
          <NuxtLink to="/products" class="a-button-buy-again">Add new product</NuxtLink>
          <NuxtLink to="/category" class="a-button-history margin-right-10"
            >Add new category</NuxtLink
          >
          <NuxtLink to="/owner" class="a-button-history margin-right-10">Add new owner</NuxtLink>

          <!-- LISTING -->
        </div>
      </div>
    </div>
    <div class="a-spacing-large"></div>
    <div class="container-fluid browsing-history">
      <div class="row">
        <div v-for="(product, index) in products" :key="product._id" class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 br bb">
          <div class="history-box">
            <!-- Product Image -->
            <a href="#" class="a-link-normal">
              <img :src="product.photo" class="img-fluid" />
            </a>
            <!-- Product title -->
            <div class="a-spacing-top-base asin-title">
              <span class="a-text-normal">
                <div class="p13n-sc-truncated">{{product.title}}</div>
              </span>
            </div>
            <div class="a-row">
              <a href="#">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </a>
              <span class="a-letter-space"></span>
              <span class="a-color-tertiary a-size-small asin-reviews"
                >(1732)</span
              >
            </div>
            <!-- Product price -->
            <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price">${{product.price}}</span>
              </span>
            </div>
            <!-- Product buttons -->
            <div class="a-row">
              <NuxtLink :to="`/products/${product._id}`" class="a-button-history margin-right-10">Update</NuxtLink>
              <a href="#" class="a-button-history margin-right-10" @click="onDeleteProduct(product._id, index)">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }){
    try {
      let response = await $axios.$get("http://localhost:8080/product/getall")
      return {
        products: response.products
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async onDeleteProduct(id, index) {
      try {
        let response = await this.$axios.$delete(`http://localhost:8080/product/deleteone/${id}`)
        if (response.success){
          this.products.splice(index, 1)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
};
</script>

<style>
</style>
