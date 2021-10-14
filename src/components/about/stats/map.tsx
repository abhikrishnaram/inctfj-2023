import React, {useState} from "react";

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from "react-tooltip";

const INDIA_TOPO_JSON = require('../../../data/india.topo.json');

const PROJECTION_CONFIG = {
    scale: 350,
    center: [78.9629, 22.5937]
};

const StateWiseRegistrationMap = ({ data }) => {

    const [tooltipContent, setTooltipContent] = useState('');

    const geographyStyle = {
        default: {
            outline: 'none'
        },
        hover: {
            fill: '#ccc',
            transition: 'all 250ms',
            outline: 'none'
        },
        pressed: {
            outline: 'none'
        }
    };

    const getStateVal = (code) => {
        if(data?.states?.length > 0)
            data.states.forEach((s) => {
                if(s['state'] === code){
                    return s['state'];
                }
            })
        return 0;
    }

    const getHeatMapData = () => {

        return [
            { id: 'AP', state: 'Andhra Pradesh', value: getStateVal('IN-AP') },
            { id: 'AR', state: 'Arunachal Pradesh', value: getStateVal('IN-AR') },
            { id: 'AS', state: 'Assam', value: getStateVal('IN-AS') },
            { id: 'BR', state: 'Bihar', value: getStateVal('IN-AS') },
            { id: 'CT', state: 'Chhattisgarh', value: getStateVal('IN-CT') },
            { id: 'GA', state: 'Goa', value: getStateVal('IN-GA') },
            { id: 'GJ', state: 'Gujarat', value: getStateVal('IN-GJ') },
            { id: 'HR', state: 'Haryana', value: getStateVal('IN-HR') },
            { id: 'HP', state: 'Himachal Pradesh', value: getStateVal('IN-HP') },
            { id: 'JH', state: 'Jharkhand', value: getStateVal('IN-JH') },
            { id: 'KA', state: 'Karnataka', value: getStateVal('IN-KA') },
            { id: 'KL', state: 'Kerala', value: getStateVal('IN-KL') },
            { id: 'MP', state: 'Madhya Pradesh', value: getStateVal('IN-MP') },
            { id: 'MH', state: 'Maharashtra', value: getStateVal('IN-MH') },
            { id: 'MN', state: 'Manipur', value: getStateVal('IN-MN') },
            { id: 'ML', state: 'Meghalaya', value: getStateVal('IN-ML') },
            { id: 'MZ', state: 'Mizoram', value: getStateVal('IN-MZ') },
            { id: 'NL', state: 'Nagaland', value: getStateVal('IN-NL') },
            { id: 'OR', state: 'Odisha', value: getStateVal('IN-OR') },
            { id: 'PB', state: 'Punjab', value: getStateVal('IN-PB') },
            { id: 'RJ', state: 'Rajasthan', value: getStateVal('IN-RJ')  },
            { id: 'SK', state: 'Sikkim', value: getStateVal('IN-SK') },
            { id: 'TN', state: 'Tamil Nadu', value: getStateVal('IN-TN') },
            { id: 'TG', state: 'Telangana', value: getStateVal('IN-TG') },
            { id: 'TR', state: 'Tripura', value: getStateVal('IN-TR') },
            { id: 'UT', state: 'Uttarakhand', value: getStateVal('IN-UT') },
            { id: 'UP', state: 'Uttar Pradesh', value: getStateVal('IN-UP') },
            { id: 'WB', state: 'West Bengal', value: getStateVal('IN-WB') },
            { id: 'AN', state: 'Andaman and Nicobar Islands', value: 0 },
            { id: 'CH', state: 'Chandigarh', value: 0 },
            { id: 'DN', state: 'Dadra and Nagar Haveli', value: 0 },
            { id: 'DD', state: 'Daman and Diu', value: 0 },
            { id: 'DL', state: 'Delhi', value: getStateVal('IN-DL') },
            { id: 'JK', state: 'Jammu and Kashmir', value: 0 },
            { id: 'LA', state: 'Ladakh', value: 0 },
            { id: 'LD', state: 'Lakshadweep', value: 0 },
            { id: 'PY', state: 'Puducherry', value: 0 }
        ];
    };

    const colorScale = (val) => {
        if(data?.registrations > 0){
            const pc = val/data?.registrations;
            if(pc > 50) return '#9a311f';
            if(pc > 40) return '#e2492d';
            if(pc > 30) return '#ff5533';
            if(pc > 10) return '#ff8a75'
            if(pc > 0) return '#ffcec5';
        }
        return '#EEE';
    };

    const onMouseEnter = (geo, current = { value: 'NA' }) => {
        return () => {
            setTooltipContent(`${geo.properties.name}: ${current.value}`);
        };
    };

    const onMouseLeave = () => {
        setTooltipContent('');
    };

    return (
        <div>
            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={600}
                height={220}
                data-tip=""
            >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            const current = getHeatMapData().find(s => s.id === geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={current ? colorScale(current.value) : '#EEE'}
                                    style={geographyStyle}
                                    // @ts-ignore
                                    onMouseEnter={onMouseEnter(geo, current)}
                                    onMouseLeave={onMouseLeave}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    )
};

export default StateWiseRegistrationMap;