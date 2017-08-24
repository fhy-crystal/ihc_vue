<template>
	<div class="rnavbar">
		<div class="panel-heading">
			<el-breadcrumb separator=">">
				<el-breadcrumb-item>license管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="panel-body">
			<!-- 搜索条件 -->
			<el-form :inline="true" :model="licenseInfo" class="demo-form-inline">
				<el-form-item>
					<el-input type="text" v-model="licenseInfo.licenseid" placeholder="请输入licenseid"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
			<br>
			
			<!-- 表格 -->
			<p class="label_title">
				<!-- 删除提示框 -->
				<el-popover ref="popover" placement="top" width="300" v-model="delDialog">
					<p>确定需要删除吗？</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="delDialog=false">取消</el-button>
						<el-button type="danger" size="mini" @click="confirmDel">确定</el-button>
					</div>
				</el-popover>
				<el-button type="danger" size="mini" v-popover:popover>删除</el-button>
				<el-button type="primary" size="mini" @click="addInfoBtn()">添加</el-button>
			</p>
			<el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="selectCurrentRow">
				<el-table-column type="index" label="序号" width="100">
				</el-table-column>
				<el-table-column prop="licenseid" label="licenseid"></el-table-column>
				<el-table-column prop="brandname" label="品牌"></el-table-column>
				<el-table-column prop="group_mark" label="备注"></el-table-column>
			</el-table>
			<!-- 添加文件对话框 -->
			<el-dialog title="添加licenseid" :visible.sync="addFileDialog">
				<el-form :model="addInfo" :rules="addInfoRules" ref="addInfo">
					<el-form-item label="licenseid" prop="licenseid">
						<el-input v-model="addInfo.licenseid" placehoder="请输入licenseid"></el-input>
					</el-form-item>
					<el-form-item label="家电类型" prop="devtypeid">
						<el-select v-model="addInfo.devtypeid" placeholder="请选择家电类型" @change="selectDevId(addInfo.devtypeid)">
							<el-option v-for="item in addInfo.devList" :label="item.devtypename" :key="item.devtypeid" :value="item.devtypeid"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="品牌" prop="brand">
						<el-select v-model="addInfo.brand" placeholder="请选择品牌">
							<el-option v-for="item in addInfo.brandList" :label="item.brand" :key="item.brandid" :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" v-model="addInfo.remark" placehoder="请输入备注"></el-input> 
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="addFileDialog=false">取消</el-button>
					<el-button type="primary" @click="addConfirm('addInfo')">确认</el-button>
				</div>
			</el-dialog>
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
				licenseInfo: {
					licenseid: '',
				},
				addInfo: {
					licenseid: '',
					devtypeid: '',
					brand: '',
					remark: '',
					devList: '',
					brandList: ''
				},
				delDialog: false,
				addFileDialog: false,
				currentRow: null,
				addInfoRules: {
					licenseid: [{
						required: true,
						message: '请输入licenseid'
					}],
					devtypeid: [{
						required: true,
						message: '请选择家电类型'
					}],
					brand: [{
						required: true,
						message: '请选择品牌'
					}]
				}
			}
		},
		created() {
			// 获取license列表
			this.getLicenseList();
		},
		methods: {
			// 获取license列表
			getLicenseList() {
				//需要发送的body
				let postBody = {
					'licenseid': this.licenseInfo.licenseid,
				};
				API.ircodeManage.getLicenseList(postBody).then((data) => {
					if (data.error == 0) {
						this.tableData = data.limitinfo;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 查询
			search() {
				// 获取license列表
				this.getLicenseList();
			},
			// 选择当前表格行
			selectCurrentRow(val) {
				this.currentRow = val;
			},
			// 确认删除
			confirmDel() {
				if (this.currentRow) {
					let postBody = {
						'operate': 'delete',
						'licenselimit': {
							'licenseid': this.currentRow.licenseid,
							'brandid': this.currentRow.brandid
						}
					};
					API.ircodeManage.licenseManage(postBody).then((data) => {
						if (data && data.error == 0) {
							this.getLicenseList();
							this.delDialog = false;
						} else {
							this.$store.dispatch('newNotice', data.msg);
							this.delDialog = false;
						}
					}, (data) => {
						this.$store.dispatch('newNotice', data);
					})
				} else {
					this.$store.dispatch('newNotice', '请选择一条数据');
					this.delDialog = false;
				}
			},
			// 获取家电列表
			getDevList() {
				let postBody = {
					'brandid': 0
				};
				API.ircodeManage.getDevList(postBody).then((data) => {
					if (data.error == 0) {
						this.addInfo.devList = data.respbody.devtype;
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
						this.addInfo.brandList = data.respbody.brand;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 点击添加按钮
			addInfoBtn() {
				this.addFileDialog = true;
				this.getDevList();
			},
			// 选择家电类型后触发品牌查询
			selectDevId(val) {
				this.addInfo.brandid = '';
				this.addInfo.brandList = [];
				if (val) {
					this.getBrandList(val);
				}
			},
			// 确认添加
			addConfirm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let postBody = {
							'operate': 'add',
							'licenselimit': {
								'licenseid': this.addInfo.licenseid,
								'brandid': this.addInfo.brand.brandid,
								'brandname': this.addInfo.brand.brand,
								'group_mark': this.addInfo.remark
							}
						};
						API.ircodeManage.licenseManage(postBody).then((data) => {
							if (data.error == 0) {
								this.getLicenseList();
								this.addFileDialog = false;
							} else {
								this.$store.dispatch('newNotice', data.msg);
								this.addFileDialog = false;
							}
						}, (data) => {
							this.$store.dispatch('newNotice', data.msg);
							this.addFileDialog = false;
						})
					}
				})
				
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
