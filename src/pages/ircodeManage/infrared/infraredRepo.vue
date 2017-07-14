<template>
	<div class="rnavbar">
		<div class="panel-heading">
			<el-breadcrumb separator=">">
				<el-breadcrumb-item>红外码库管理</el-breadcrumb-item>
				<el-breadcrumb-item>码库查询</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="panel-body">
			<!-- 搜索条件 -->
			<el-form :inline="true" ref="irocodeInfo" :rules="rules" :model="irocodeInfo" class="demo-form-inline">
				<el-form-item prop="ircodeid">
					<el-input type="number" v-model="irocodeInfo.ircodeid" placeholder="请输入红码ID"></el-input>
				</el-form-item>
				<el-form-item prop="devtypeid">
					<el-select v-model="irocodeInfo.devtypeid" placeholder="请选择家电类型" @change="selectDevId(irocodeInfo.devtypeid)">
						<el-option v-for="item in searchKeys.devList" :label="item.devtypename" :key="item.devtypeid" :value="item.devtypeid"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="brandid">
					<el-select v-model="irocodeInfo.brandid" placeholder="请选择品牌">
						<el-option v-for="item in searchKeys.brandList" :label="item.brand" :key="item.brandid" :value="item.brandid"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="providerid" v-show="this.irocodeInfo.devtypeid==2">
					<el-select v-model="irocodeInfo.providerid" placeholder="请选择供应商">
						<el-option v-for="item in searchKeys.providerList" :label="item.providername" :key="item.providerid" :value="item.providerid"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="version">
					<el-input v-model="irocodeInfo.version" placeholder="请输入型号"></el-input>
				</el-form-item>
				<el-form-item prop="status">
				 	<el-select v-model="irocodeInfo.status" placeholder="请选择状态">
				 		<el-option v-for="item in searchKeys.statusList" :label="item" :value="item" :key="item"></el-option>
				 	</el-select>
				</el-form-item>
				<el-form-item>
					<el-col :span="11">
						<el-form-item prop="starttime">
							<el-date-picker :picker-options="notAfterTody" format="yyyy-MM-dd" type="date" placeholder="请选择开始时间" v-model="irocodeInfo.starttime" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-form-item prop="endtime">
							<el-date-picker :picker-options="notAfterTody" format="yyyy-MM-dd" type="date" placeholder="请选择结束时间" v-model="irocodeInfo.endtime" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-form-item>
				
				<el-form-item>
					<el-button @click="reset('irocodeInfo')">重置</el-button>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
			<br>
			
			<!-- 表格 -->
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="ircodeid" label="ID" width="80"></el-table-column>
				<el-table-column prop="devtypename" label="家电类型"></el-table-column>
				<el-table-column prop="brand" label="中文品牌"></el-table-column>
				<el-table-column prop="enbrand" label="英文品牌"></el-table-column>
				<el-table-column prop="version" label="型号"></el-table-column>
				<el-table-column prop="createtime" label="创建时间" sortable></el-table-column>
				<el-table-column prop="author" label="创建人"></el-table-column>
				<el-table-column prop="status" label="状态"></el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="primary" size="mini">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="panel-body block pull-right">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import API from '../../../config/api.js'
	import commonMethod from '../../../config/common.js'

	export default {
		name: 'hello',
		data () {
			return {
				// table信息
				tableData: [],
				total: 0,
				pageSizes: [10, 20, 50, 100],
				pageSize: 10,
				currentPage: 1,
				irocodeInfo: {
					ircodeid: '',
					devtypeid: '',
					brandid: '',
					providerid: '',
					version: '',
					endtime: '',
					locateidList: [0, 0, 0],
					providerid: '',
					starttime: '',
					status: '',
				},
				starttime: '',
				endtime: '',
				rules: {
					ircodeid: '',
					devtypeid: '',
					brandid: '',
					providerid: '',
					version: '',
					endtime: '',
					providerid: '',
					starttime: '',
					status: '',
				},
				// 搜索条件
				searchKeys: {
					devList: [],
					brandList: [],
					statusList: [],
					providerList: []
				},
				// 结束时间不早于开始时间
				notAfterTody: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				}
			}
		},
		created() {
			// 获取家电类型列表
			this.getDevList();
			// 获取红码列表
			this.getInfrareList();
			// 获取状态列表
			this.getStatusList();
		},
		methods: {
			// 获取红码列表
			getInfrareList() {
				this.formatTime();
				//需要发送的body
				let postBody = {
					'ircodeid': commonMethod.toZero(this.irocodeInfo.ircodeid),
					'devtypeid': commonMethod.toZero(this.irocodeInfo.devtypeid),
					'brandid': commonMethod.toZero(this.irocodeInfo.brandid),
					'version': this.irocodeInfo.version,
					'locateidList': [0, 0, 0],
					'providerid': commonMethod.toZero(this.irocodeInfo.providerid),
					'status': this.irocodeInfo.status,
					'starttime': this.starttime,
					'endtime': this.endtime,
					'index': (this.currentPage-1) * this.pageSize,
					'step': this.pageSize
				};
				API.ircodeManage.getInfrareList(postBody).then((data) => {
					if (data.error == 0) {
						this.tableData = data.respbody.ircodeinfo;
						this.total = data.respbody.count;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 分页器
			handleSizeChange(val) {
				this.pageSize = val;
				this.getInfrareList();
				// console.log(`每页 ${val} 条`);
			},
			// 页面跳转
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getInfrareList();
				// console.log(`当前页: ${val}`);
			},
			// 查询
			search() {
				// 获取红码列表
				this.getInfrareList();
			},
			// 重置
			reset(formName) {
				this.$refs[formName].resetFields();
				this.starttime = '';
				this.endtime = '';
			},
			// 获取家电列表
			getDevList() {
				let postBody = {
					'brandid': 0
				};
				API.ircodeManage.getDevList(postBody).then((data) => {
					if (data.error == 0) {
						this.searchKeys.devList = data.respbody.devtype;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 获取品牌列表
			getBrandList(devId) {
				let postBody = {
					'devtypeid': devId
				};
				API.ircodeManage.getBrandList(postBody).then((data) => {
					if (data.error == 0) {
						this.searchKeys.brandList = data.respbody.brand;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 获取供应商
			getProviderList() {
				API.ircodeManage.getProviderList().then((data) => {
					if (data.error == 0) {
						this.searchKeys.providerList = data.providerinfo;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 获取状态
			getStatusList() {
				API.ircodeManage.getStatusList().then((data) => {
					if (data.error == 0) {
						this.searchKeys.statusList = data.respbody.statuslist;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 选择家电类型后触发品牌查询
			selectDevId(val) {
				this.irocodeInfo.brandid = '';
				this.searchKeys.brandList = [];
				if (val) {
					this.getBrandList(val);
				}
			},
			// 根据接口格式化时间
			formatTime() {
				if (this.irocodeInfo.starttime) {
					this.starttime = commonMethod.formatTime(this.irocodeInfo.starttime.getTime()) + ' 00:00:00';
				}
				if (this.irocodeInfo.endtime) {
					this.endtime = commonMethod.formatTime(this.irocodeInfo.endtime.getTime()) + ' 23:59:59'
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el-form--inline .el-form-item {
		margin-right: 0;
	}
	.line {
		text-align: center;
	}
</style>
