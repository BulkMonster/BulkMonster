const router = new VueRouter({
  mode: 'history',
  base: '/InstaBulk/',
  routes: []
});
const app = new Vue({
  router,
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  data() {
    return {
      loader: true,
      page: {
        wait: true,
        showAd: true
      },
      form: {
        bulks: "",
        bulksList: [],
        recaptcha: ""
      },
      button: {
        text: 'Şimdi Sonuçlar Listele',
        icon: 'search',
        color: 'purple',
        click: false
      }
    }
  },
  methods: {
    // checkBulk: function() {
    //   const that = this;
    //
    //   // Check Area
    //   let list = this.bulks
    //     .replace(" ","")
    //     .split("\n")
    //     .filter(e => e !== "")
    //     .filter((v, i, a) => a.indexOf(v) === i);
    //   that.bulksList = [];
    //   list.forEach(function (e) {
    //     that.bulksList.push({
    //       nick: e,
    //       type: "wait",
    //       usable: false,
    //       possible: true
    //     });
    //   });
    //
    //   // Actions
    //   if (this.bulksList[0]) {
    //     $('html, body').animate({
    //       scrollTop: $(".content").offset().top
    //     }, 1000, "swing", function () {
    //       that.wait = false;
    //     });
    //     $.each(that.bulksList, function (i,e) {
    //       axios({
    //         url: 'http://localhost/ideasoft/instagram.php',
    //         responseType: 'json',
    //         params: {
    //           nick: e.nick
    //         },
    //       }).then(function (response) {
    //         that.bulksList[i].usable = response.data.usable;
    //         that.bulksList[i].possible = response.data.possible;
    //         setTimeout(function () {
    //           that.bulksList[i].type = response.data.possible ? response.data.usable ? "check" : "times" : "exclamation";
    //         }, 3000)
    //       });
    //     });
    //   } else {
    //     this.changeButton('Boş Kontrol Yapılamaz', 'times', 'danger');
    //   }
    // },
    onSubmit: function () {
      const that = this;
      that.processData(that);

      if (this.form.recaptcha !== "") {
        if (this.form.bulksList[0]) {
          $('html, body').animate({scrollTop: $(".content").offset().top}, 1000, "swing", function () {
            that.page.wait = false;
          });
          if (that.page.wait) {
            that.resetRecaptcha();
            setTimeout(function () {
              that.checkApi(that);
              that.page.showAd = false;
            }, 4000)
          }
        } else {
          this.changeButton('Boş Kontrol Yapılamaz', 'times', 'danger');
        }
      } else {
        that.changeButton("Robot Musun", "question", "warning");
      }
    },
    onVerify: function (response) {
      if (response) this.form.recaptcha = response;
    },
    onExpired: function () {
      this.form.recaptcha = "";
    },
    resetRecaptcha () {
      this.$refs.recaptcha.reset()
    },
    changeButton: function (text, icon, color = 'purple', time = 1500) {
      const that = this, defaultButton = this.button;
      if (!this.button.click) {
        this.button = {text: text, icon: icon, color: color, click: true};
        setTimeout(function () {
          that.button = defaultButton;
        }, time);
      }
    },
    processData: function (that) {
      let list = that.form.bulks.replace(" ","").split("\n").filter(e => e !== "").filter((v, i, a) => a.indexOf(v) === i);
      that.form.bulksList = [];
      list.forEach(function (e) {
        that.form.bulksList.push({nick: e, type: "wait", usable: false, possible: true});
      });
    },
    checkApi: function (that) {
      console.log(that.form.bulksList);
    }
  },
  mounted() {
    this.loader = false;
  }
}).$mount('#app');

// // PWA Code
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js').then(() => console.log("[SW] Is activated."));
// }