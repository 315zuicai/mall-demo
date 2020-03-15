// 利用混入技术，可以避免对象之间的代码复用

import BackTop from "components/content/backTop/BackTop";

import {POP, NEW, SELL} from "./const";

import {
  debounce
} from "common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    };
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on('itemImageLoad', () => {
      refresh();
    });

    // console.log('我是混入的内容');
  },
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backClick() {
      // 父组件访问子组件的某个方法
      this.$refs.scroll.scrollTo(0, 0);
    },
  },

};

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		};
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP;
					break;
				case 1:
					this.currentType = NEW;
					break;
				case 2:
					this.currentType = SELL;
					break;
			}
			// console.log(this.currentType);
		}
	}
}
