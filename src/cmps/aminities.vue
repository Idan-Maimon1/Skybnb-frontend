<template>
  <section class="amenities-layout">
    <h2 class="aminities-title">What this place offers</h2>
    <section class="amenities-list-main">
      <div v-for="amenitie in stayAmenitiesSliced" :key="amenitie">
        <img class="amenitie-svg" :src="getImgUrl(amenitie)" alt="img" />
        {{ amenitie }}
      </div>
    </section>
    <div class="amenities-modal">
      <vue-final-modal v-model="showAmenitiesModal" class="modal-container" content-class="modal_content">
        <section class="modal-container">
          <div class="close-modal">
            <button class="modal__close" @click="showAmenitiesModal = false">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                focusable="false" style="
                  display: block;
                  fill: none;
                  height: 16px;
                  width: 16px;
                  stroke: currentcolor;
                  stroke-width: 3;
                  overflow: visible;
                ">
                <path d="m6 6 20 20"></path>
                <path d="m26 6-20 20"></path>
              </svg>
            </button>
          </div>
          <div class="modal-amenities-container">
            <div class="modal__title">
              <div class="exit-amnt-modal" @click="showAmenitiesModal = false">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                  focusable="false"
                  style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;">
                  <path d="m6 6 20 20"></path>
                  <path d="m26 6-20 20"></path>
                </svg>
              </div>
              <h2 class="aminities-title">What this place offers</h2>
              <section class="amenities-list">
                <div v-for="amenitie in stayAmenities" :key="amenitie">
                  <div class="modal-amenitie">
                    <img class="amenitie-svg" :src="getImgUrl(amenitie)" alt="" />
                    {{ amenitie }}
                  </div>
                  <hr class="seperating-line" />
                </div>
              </section>
            </div>
          </div>
        </section>
      </vue-final-modal>
      <!-- v-button -->
      <button class="show-amenities-btn" @click="showAmenitiesModal = true">
        Show all {{ stayAmenities.length }} amenities
      </button>
    </div>
  </section>
</template>

<script>
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
export default {
  components: {
    VueFinalModal,
    ModalsContainer,
  },

  props: {
    stayAmenities: {
      type: Object,
    },
  },
  data() {
    return {
      stayAmenitiesSliced: null,
      numOfAmenities: null,
      showAmenitiesModal: false,
    }
  },
  created() {
    this.stayAmenitiesSliced = this.stayAmenities.slice(0, 10)
    return this.stayAmenitiesSliced
  },
  methods: {
    getImgUrl(amenitie) {
      var formatedAmenitie = amenitie.replaceAll(' ', '-')
      formatedAmenitie = formatedAmenitie.replaceAll('/', '-')
      formatedAmenitie = formatedAmenitie.replaceAll('(', '')
      formatedAmenitie = formatedAmenitie.replaceAll(')', '')
      formatedAmenitie = formatedAmenitie.replaceAll('???', '')

      let imgUrl = `https://res.cloudinary.com/nogacloud/image/upload/aminities/${formatedAmenitie}.svg`
      let isExists = this.imageExists(imgUrl);
      if (isExists) return new URL(imgUrl, import.meta.url).href
      imgUrl = `https://res.cloudinary.com/nogacloud/image/upload/aminities/defualt.svg`
      return new URL(imgUrl, import.meta.url).href
    },
    imageExists(image_url) {
      var http = new XMLHttpRequest();
      http.open('HEAD', image_url, false);
      http.send();
      return http.status != 404;
    }
  },
  computed: {},
  unmounted() { },
}
</script>
