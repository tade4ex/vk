<template>
  <div class="row mt-5" v-if="authVkSuccess === true">
    <div class="col-12">
      <div v-if="groupDataStartLoading">
        <div v-if="groupDataLoading">
          <loading/>
        </div>
        <div v-else>
          <div v-if="groupAlert != null">
            <b-alert variant="danger" show>{{groupAlert}}</b-alert>
          </div>
          <div v-else>
            <div class="row">
              <div v-if="groupName !== ''" class="col-12">
                <group-info :groupPhoto="groupPhoto" :groupName="groupName" :groupDescription="groupDescription"/>
                <h1>Group stats</h1>
                <hr/>
                <b-btn v-b-modal.myModalA variant="primary">Users from country/city</b-btn>
                <hr/>
                <p><b>Post arg likes: </b>{{postsLikeArg}}</p>
                <p><b>Post arg views: </b>{{postsViewArg}}</p>
                <div v-if="userMaxLikes != null">
                  <p><b>User max likes: </b>{{userMaxLikes.first_name}} {{userMaxLikes.last_name}} <b>({{userMaxLikes.like_count}})</b></p>
                </div>
                <hr>

                <chart-bar title="Sex chart" type="bar" :series="groupChartSexSeries" :categories="groupChartSexCategories"/>
                <chart-bar title="Age chart" type="line" :series="groupChartAgeSeries" :categories="groupChartAgeCategories"/>

                <b-modal id="myModalA" size="lg" title="Users from country/city">
                  <b-table striped hover :items="userFromItems" :fields="formFields"/>
                </b-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import bTable from 'bootstrap-vue/es/components/table/table';
  import bModal from 'bootstrap-vue/es/components/modal/modal';
  import bAlert from 'bootstrap-vue/es/components/alert/alert';
  import bBtn from 'bootstrap-vue/es/components/button/button';

  import ChartBar from '@/components/ChartBar';
  import Loading from '@/components/Loading';
  import GroupInfo from '@/components/GroupInfo';



  export default {
    name: 'GroupInfoPage',
    props: ['authVkSuccess', 'vkAccessToken'],
    data() {
      this.$store.dispatch('vkGroup/getGroup', {
        accessToken: this.vkAccessToken,
        groupId: this.$route.params.id
      });
      return {
        form: {
          groupId: ''
        },
        formFields: {
          place: {
            label: 'Place',
            sortable: true
          },
          count: {
            label: 'count',
            sortable: true
          }
        }
      }
    },
    computed: mapState({
      groupDataLoading: state => state.vkGroup.dataLoading,
      groupDataStartLoading: state => state.vkGroup.dataStartLoading,
      groupAlert: state => state.vkGroup.alert,
      groupName: state => state.vkGroup.name,
      groupDescription: state => state.vkGroup.description,
      groupPhoto: state => state.vkGroup.photo,
      groupChartSexSeries: state => state.vkGroup.sexChartSeries,
      groupChartSexCategories: state => state.vkGroup.sexChartCategories,
      groupChartAgeSeries: state => state.vkGroup.ageChartSeries,
      groupChartAgeCategories: state => state.vkGroup.ageChartCategories,
      userFromItems: state => state.vkGroup.userFromItems,
      postsLikeArg: state => state.vkGroup.postsLikeArg,
      postsViewArg: state => state.vkGroup.postsViewArg,
      userMaxLikes: state => state.vkGroup.userMaxLikes,
    }),
    methods: {
      onSubmit(e) {
        e.preventDefault();

        return false;
      }
    },
    components: {
      bBtn,
      ChartBar,
      bAlert,
      bTable,
      bModal,
      Loading,
      GroupInfo
    }
  }
</script>
