<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Update {{product.title}}</h2>
                        <form action="">
                            <!-- Category dropdown -->
                            <div class="a-spacing-top-medium" >
                                <label>Category</label>
                                <select class="a-select-option" v-model="categoryID">
                                    <option v-for="category in categories" :value="category._id" :key="category._id">{{category.type}}</option>
                                </select>
                            </div>

                            <!-- Owner dropdown -->
                            <div class="a-spacing-top-medium">
                                <label>Owner</label>
                                <select class="a-select-option" v-model="ownerID">
                                    <option v-for="owner in owners" :value="owner._id" :key="owner._id">{{owner.name}}</option>
                                </select>
                            </div>

                            <!-- Tile -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;">Title</label>
                                <input type="text" class="a-input-text" style="width: 100%;" v-model="title" :placeholder="product.title">
                            </div>

                            <!-- Price -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;">Price</label>
                                <input type="text" class="a-input-text" style="width: 100%;" v-model="price" :placeholder="product.price">
                            </div>

                            <!-- Price -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;">Stock quantity</label>
                                <input type="text" class="a-input-text" style="width: 100%;" v-model="stockQuantity" :placeholder="product.stockQuantity">
                            </div>

                            <!-- Description -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;">Description</label>
                                <textarea style="width: 100%;" v-model="description" :placeholder="product.description"></textarea>
                            </div>

                            <!-- Photo link-->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;">Photo</label>
                                <input type="text" class="a-input-text" style="width: 100%;" v-model="photo" :placeholder="product.photo">
                            </div>

                            <!-- Photo upload-->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;">Photo</label>
                                <div class="a-row a-spacing-top-medium">
                                    <label class="choosefile-button">
                                        <i class="fal fa-plus"></i>
                                        <input type="file"/>
                                        <p style="margin-top: -70px">Name of the photo</p>
                                    </label>
                                </div>
                            </div>
                            <hr>
                            <!-- Button -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onUpdateProduct">Update product</span>
                                    </span>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ $axios, params}){
        try {
            let categories = $axios.$get('http://localhost:8080/category/getall')
            let owners = $axios.$get('http://localhost:8080/owner/getall')
            let product = $axios.$get(`http://localhost:8080/product/getone/${params.id}`)
    
            const [catResponse, ownerResponse, productResponse] = await Promise.all([
                categories,
                owners,
                product
            ])
    
            return {
                categories: catResponse.categories,
                owners: ownerResponse.owners,
                product: productResponse.product
            }
            
        } catch (err) {
            console.log(err)
        }
    },
    data(){
        return {
            categoryID: null,
            ownerID: null,
            title: "",
            price: "",
            description: "",
            photo: "",
            stockQuantity: ""

        }
    },
    methods: {
        async onUpdateProduct(){
            try {
                let data = {};
                data["title"] = this.title
                data["description"] = this.description
                data["price"] = this.price
                data["stockQuantity"] = this.stockQuantity
                data["ownerID"] = this.ownerID
                data["categoryID"] = this.categoryID
                data["photo"] = this.photo
    
                let result = await this.$axios.$put(`http://localhost:8080/product/update/${this.$route.params.id}`, data)
                this.$router.push("/")             
            } catch (err) {
                console.log(err)
            }
        }
    }
};
</script>

<style>
</style>