<template>
	<div class="rnavbar">
		<div class="panel-heading">
			<el-breadcrumb separator=">">
				<el-breadcrumb-item :to="{path:'/ircodeManage/list'}">红外码库管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{path:'/ircodeManage/list'}">码库查询</el-breadcrumb-item>
				<el-breadcrumb-item>详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="panel-body">
			<el-row>
				<el-col :span="12">
					<el-form label-position="top" ref="ircodeInfo" :model="ircodeInfo" label-width="120px">
						<el-form-item label="红码ID">
							<el-input type="number" v-model="ircodeInfo.ircodeid" disabled></el-input>
						</el-form-item>
						<el-form-item label="家电类型">
							<el-select v-model="ircodeInfo.devtypeid" placeholder="请选择家电类型" @change="selectDevId(ircodeInfo.devtypeid)">
								<el-option v-for="item in allList.devList" :label="item.devtypename" :key="item.devtypeid" :value="item.devtypeid"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="品牌">
							<el-select v-model="ircodeInfo.brandid" placeholder="请选择品牌" @change="selectBrandId(ircodeInfo.brandid)">
								<el-option v-for="item in allList.brandList" :label="item.brand" :key="item.brandid" :value="item.brandid"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="型号">
							<el-select v-model="ircodeInfo.versionid" placeholder="请选择型号">
								<el-option v-for="item in allList.versionList" :label="item.version" :key="item.versionid" :value="item.versionid"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="供应商" v-show="ircodeInfo.devtypeid==2">
							<el-select v-model="ircodeInfo.providerid" placeholder="请选择供应商">
								<el-option v-for="item in allList.providerList" :label="item.providername" :key="item.providerid" :value="item.providerid"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="状态">
							<el-select v-model="ircodeInfo.status" placeholder="请选择状态">
								<el-option v-for="item in allList.statusList" :label="item" :value="item" :key="item"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="创建人">
							<el-input v-model="ircodeInfo.author" disabled></el-input>
						</el-form-item>
						<el-form-item label="创建时间">
							<el-input v-model="ircodeInfo.createtime" disabled></el-input>
						</el-form-item>
						<el-form-item label="添加红码文件">
							<a :href="url + 'publicircode/v1/manage/getircodefile?ircodeid=' + ircodeInfo.ircodeid">{{ircodeInfo.ircodefile}}</a>
							<br>
							<el-button @click="uploadIrcode">
								<span v-show="!ircodeInfo.ircodefile">点击上传</span>
								<span v-show="ircodeInfo.ircodefile">重新上传</span>
							</el-button>
							<input type="file" id="link" style="display:none" @change="uploadMethod">
						</el-form-item>
						<el-form-item>
							<el-button class="pull-right" type="primary" @click="save">保存</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<br>
			
			<!-- 表格 -->
			<p class="label_title">
				文件列表
				<!-- 删除提示框 -->
				<el-popover ref="popover" placement="top" width="300" v-model="delDialog">
					<p>这是一段内容这是一段内容确定删除吗？</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="delDialog=false">取消</el-button>
						<el-button type="danger" size="mini" @click="confirmDel">确定</el-button>
					</div>
				</el-popover>
				<el-button type="danger" size="mini" v-popover:popover>删除文件</el-button>
				<el-button type="primary" size="mini" @click="addFileDialog=true;file.tag=''">添加文件</el-button>
			</p>
			<!-- 文件列表 -->
			<el-table :data="ircodeInfo.funcfile" stripe style="width: 100%" size="small" highlight-current-row @current-change="selectCurrentRow">
				<el-table-column prop="filename" label="文件名"></el-table-column>
				<el-table-column prop="mtag" label="标签"></el-table-column>
				<el-table-column prop="updatetime" label="更新时间"></el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="primary" size="mini" @click="download(scope.row.mtag)">下载</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 添加文件对话框 -->
			<el-dialog title="添加文件" :visible.sync="addFileDialog">
				<el-form :model="file" :rules="fileRules" ref="file">
					<el-form-item label="标签" prop="tag">
						<el-input v-model="file.tag" placehoder="请输入标签"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="uploadFile('file')">
							<span>点击上传</span>
						</el-button>
						<input type="file" id="link2" style="display:none" @change="fileUploadMethod">
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="addFileDialog=false">取消</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import API from '../../../config/api.js'
	import urls from '../../../config/urls.js'
	import commonMethod from '../../../config/common.js'

	export default {
		name: 'hello',
		data () {
			let checkTag=(rule, value, callback) => {
				let re=/^[A-Za-z0-9]+/; //数字和大小写英文
				if (value === '') {
					callback(new Error('请输入标签'));
				} else if (!re.test(value)) {
					callback(new Error('请输入数字或英文'));
				} else {
					callback();
				}
			};
			return {
				url: urls.httpUrl,
				ircodeInfo: {
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
					filename: '',
					funcfile: []
				},
				// 搜索条件
				allList: {
					devList: [],
					brandList: [],
					statusList: [],
					providerList: [],
					versionList: []
				},
				// 上传文件
				file: {
					tag: ''
				},
				fileRules: {
					tag: [{
						validator: checkTag,
						trigger: 'blur'
					}]
				},
				addFileDialog: false,
				delDialog: false,
				currentRow: null
			}
		},
		created() {
			// 获取家电类型列表
			this.getDevList();
			// 获取红码详情
			this.getInfrareDetail();
			// 获取状态列表
			this.getStatusList();
		},
		methods: {
			// 获取红码详情
			getInfrareDetail() {
				let postBody={
					'ircodeid': parseInt(this.$route.query.id)
				};
				API.ircodeManage.getIrcodeDetail(postBody).then((data) => {
					if (data.error == 0) {
						this.ircodeInfo=data.respbody.ircodeinfo;
						this.devtypeid=data.respbody.ircodeinfo.devtypeid;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 保存
			save() {
				var postBody={
					'ircodeid': this.ircodeInfo.ircodeid,
					'devtypeid': this.ircodeInfo.devtypeid,
					'brandid': this.ircodeInfo.brandid,
					'versionid': this.ircodeInfo.versionid,
					'providerid': this.ircodeInfo.providerid,
					'status': this.ircodeInfo.status,
				};

				API.ircodeManage.updateIrcode(postBody).then((data) => {
					if (data.error == 0) {
						this.$message({
							message: '保存成功',
							type:'success'
						});
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 获取家电列表
			getDevList() {
				let postBody={
					'brandid': 0
				};
				API.ircodeManage.getDevList(postBody).then((data) => {
					if (data.error == 0) {
						this.allList.devList=data.respbody.devtype;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 获取品牌列表
			getBrandList(devId) {
				let postBody={
					'devtypeid': devId
				};
				API.ircodeManage.getBrandList(postBody).then((data) => {
					if (data.error == 0) {
						this.allList.brandList=data.respbody.brand;
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
						this.allList.providerList=data.providerinfo;
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
						this.allList.statusList=data.respbody.statuslist;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 获取型号
			getVersionList(brandid) {
				let postBody={
					'brandid': brandid
				};
				API.ircodeManage.getVersionList(postBody).then((data) => {
					if (data.error == 0) {
						this.allList.versionList=data.respbody.version;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			},
			// 选择家电类型后触发品牌查询
			selectDevId(val) {
				this.allList.brandList=[];
				if (val) {
					this.getBrandList(val);
				}
				// this.ircodeInfo.brandid='';
			},
			// 选择品牌后触发型号查询
			selectBrandId(val) {
				this.allList.versionList=[];
				if (val) {
					this.getVersionList(val);
				}
				// this.ircodeInfo.brandid='';
			},
			// 点击上传ircode
			uploadIrcode() {
				document.getElementById('link').click();
			},
			// 上传
			uploadMethod() {
				let fileObj = commonMethod.getFileObjAndSize(document.getElementById('link'));
				API.ircodeManage.uploadIrcode({file: fileObj}, {Ircodeid: this.ircodeInfo.ircodeid}).then((data) => {
					if (data && data.error == 0) {
						this.ircodeInfo.ircodefile = fileObj.name;
						this.getInfrareDetail();
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data)
				})
			},
			// 点击添加文件
			uploadFile(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						document.getElementById('link2').click();
					} else {
						return false;
					}
				});
			},
			// 上传
			fileUploadMethod() {
				let fileObj = commonMethod.getFileObjAndSize(document.getElementById('link2'));
				let postBody = {
					'ircodeid': this.ircodeInfo.ircodeid,
					'tag': this.file.tag,
					'file': fileObj
				};
				API.ircodeManage.uploadIrcodeFile(postBody).then((data) => {
					if (data && data.error == 0) {
						this.getInfrareDetail();
						this.addFileDialog = false;
					} else {
						this.$store.dispatch('newNotice', data.msg);
						this.addFileDialog = false;
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data);
				})
			},
			// 下载
			download(tag) {
				window.location.href = this.url + 'publicircode/v1/manage/getfuncfile?ircodeid=' + this.ircodeInfo.ircodeid + '&mtag=' + tag
			},
			// 选择当前表格行
			selectCurrentRow(val) {
				this.currentRow = val;
			},
			// 确认删除
			confirmDel() {
				if (this.currentRow) {
					let postBody = {
						'ircodeid': this.ircodeInfo.ircodeid,
						'mtag': this.currentRow.mtag
					};
					API.ircodeManage.delIrcodeFile(postBody).then((data) => {
						if (data && data.error == 0) {
							this.getInfrareDetail();
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
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.label_title {
		font-size: 14px;
			font-weight: 700;
			color: #48576a;
	}
</style>
