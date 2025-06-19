<template>
    <div class="container">
        <div>
            <div>
                复选框：
                <el-checkbox v-model="checked1" label="Option 1" size="large" />
                <el-checkbox v-model="checked2" label="Option 2" size="large" />
            </div>

            <hr>
            <div>单选框：
                <el-radio-group v-model="radio1">
                    <el-radio value="1" size="large">Option 1</el-radio>
                    <el-radio value="2" size="large">Option 2</el-radio>
                </el-radio-group>
            </div>

            <hr>
            <div>Input输入框：
                <el-input v-model="input" style="width: 240px" placeholder="Please input" />
            </div>

            <hr>
            <div>Select选择器：
                <el-select v-model="selectValue" placeholder="Select" style="width: 240px">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>

        </div>
    </div>

    <div class="container">
        <el-form label-width="auto" style="max-width: 600px">
        <el-form-item label="Activity name">
        <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
        </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
        <el-col :span="11">
            <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
            />
        </el-col>
        <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
            <el-time-picker
            v-model="form.date2"
            placeholder="Pick a time"
            style="width: 100%"
            />
        </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
            <el-checkbox value="Online activities" name="type">
            Online activities
            </el-checkbox>
            <el-checkbox value="Promotion activities" name="type">
            Promotion activities
            </el-checkbox>
            <el-checkbox value="Offline activities" name="type">
            Offline activities
            </el-checkbox>
            <el-checkbox value="Simple brand exposure" name="type">
            Simple brand exposure
            </el-checkbox>
        </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
            <el-radio value="Sponsor">Sponsor</el-radio>
            <el-radio value="Venue">Venue</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
    </div>

    <div class="container">
        <el-card style="max-width: 480px">
            <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
        </el-card>
        <hr>
        <div style="display: flex;">
            <el-card style="width: 480px" shadow="always">Always</el-card>
            <el-card style="width: 480px" shadow="hover">Hover</el-card>
            <el-card style="width: 480px" shadow="never">Never</el-card>
        </div>
    </div>
    
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
    name: "MyElementPlus",

    data() {
        return {
            checked1: true,
            checked2: false,

            radio1: '1',

            selectValue: '',

            options : [
            {
                value: 'Option1',
                label: 'Option1',
            },
            {
                value: 'Option2',
                label: 'Option2',
            },
            {
                value: 'Option3',
                label: 'Option3',
            },
            {
                value: 'Option4',
                label: 'Option4',
            },
            {
                value: 'Option5',
                label: 'Option5',
            }],

            form: {
                name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            }

            
            
        }

        
    },
    methods: {
        
    }

}
</script>

<style  scoped>



.container{
    /* display: flex; */
    /* align-items: center; */
    /* height: 100px; */
    /* justify-content: center; */
    
    background-color: skyblue;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    margin: 10px 10px;
    padding: 10px;
    text-align: left;
}



</style>