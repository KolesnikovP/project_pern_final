/* eslint-disable react/jsx-boolean-value */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { Navigation } from 'swiper';
import ModuleItem from './ModuleItem/ModuleItem';
import TopicsItem from './TopicsItem/TopicsItem';
import { getModules, getTopics } from '../../redux/thunk/moduleAsyncAction';
// import Loader from '../UI/Loader/Loader';
import { modulesArr } from './ModuleArrs';
import css from './Modules.module.css';
// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';
import './styles.css';
import { fetchAuthPassportJs } from '../../redux/thunk/userAsyncAction';
// import required modules

function Modules() {
  const dispatch = useDispatch();
  const { modules } = useSelector((state) => state.modulesReducer);

  useEffect(() => {
    dispatch(fetchAuthPassportJs());
    dispatch(getModules());
    dispatch(getTopics('JavaScript'));
  }, [dispatch]);

  return (
    <Container className={css.Container} maxWidth="sm">
      <Box className={css.Box}>
        <Box className={css.Slider}>
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            slidesPerGroup={2}
            loop={false}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {modules.length &&
              modules.map((module, index) => (
                <SwiperSlide key={module.id}>
                  <ModuleItem
                    className={css.ModuleItem}
                    key={module.id}
                    titleModules={module.titleModules}
                    // временное решение пока нет картирки в бд
                    img={modulesArr[index].img}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>
      </Box>

      <TopicsItem />
    </Container>
  );
}

export default Modules;
