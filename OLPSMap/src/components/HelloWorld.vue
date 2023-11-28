<template>
    <div>
      <BMap
        :center=locationStart
        :zoom="16"
        :plugins="['TrackAnimation']"
        ref="map"
      />
      <div class="state">
        <span>动画状态: {{ status !== 'INITIAL' ? '已开始' : '未开始' }}</span>
        <span>播放状态: {{ status === 'INITIAL' || status === 'STOPPING' ? '未播放' : '播放中' }}</span>
      </div>
      <button type="button" @click="newstart">开始</button>
      <button type="button" @click="stop">暂停</button>
      <button type="button" @click="proceed">继续</button>
      <button type="button" @click="cancel">取消</button>
    </div>
  </template>
  
  <script setup >
    import { ref,reactive } from 'vue'
    import { useTrackAnimation } from 'vue3-baidu-map-gl'
    import axios from 'axios'
    const map = ref(null)
    const path = reactive([])
    const { setPath, start, cancel, stop, proceed, status } = useTrackAnimation(map, {
      duration: 100000,
      delay: 0
    })
    const locationStart = {
        lng: 116.339303,
        lat: 40.01116
    }
    const newstart = () =>{
        axios.get('http://127.0.0.1:5000/action',{
            params:{
                origin:locationStart.lat+','+locationStart.lng,
                destination:locationEnd.lat+','+locationEnd.lng,
                ak:'Buvb6KrY687IiA3RDVKsOa9bUNyQdpj1'
            },
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        }).then((resp)=>{
            console.log(resp);
           if(resp.data.status == '0'){    
           const DataList = resp.data.result.routes[0].steps
            DataList.forEach(element => {
                const subDataList = (element.path).split(";");
                subDataList.forEach((subelement)=>{
                 const subData = subelement.split(",")
                 const EndData = {
                    lng: subData[0],
                    lat: subData[1]
                 }
                 path.push(EndData)
                 console.log(EndData);
                })
            });
            console.log(path);
            setPath(path)
            start()
           }else{
            console.log(resp.data.message);
           }
        }).catch((err)=>{
            alert(err)
        })
    }
    const locationEnd = {
        lng: 116.452562,
        lat: 39.936404
    }


  </script>
  
  <style>
    .state {
      margin-top: 15px;
    }
    .state span {
      margin-right: 25px;
    }
  </style>