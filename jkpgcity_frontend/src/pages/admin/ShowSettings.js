import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { set, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SettingsController from '../../controller/SettingsController';

const homePageSettingsSchema = yup.object().shape({
    title: yup.string().required(),
    metaKeywords: yup.string().required(),
    metaDescription: yup.string().required()
});

const googleAnalyticsSchema = yup.object().shape({
    googleAnalytics: yup.string()
        .matches(/(UA-\d{4,10}-\d{1,4}|G-[A-Z0-9]+)/i, "Please enter a valid Google Analytics code")
        .required("Google Analytics code is required")
});

const facebookPixelSchema = yup.object().shape({
    facebookPixel: yup.string()
        .matches(/^\d{15}$/, "Please enter a valid 15-digit Facebook Pixel code")
        .required("Facebook Pixel code is required")
});

/** List of all settings 
     * <ol>
     * <li>Home Page Settings:
     * <ul>
     * <li>homepageTitle</li>
     * <li>homepageMetaKeywords</li>
     * <li>homepageDescription</li>
     * </ul>
     * </li>
     * <li>googleAnalytics</li>
     * <li>facebookPixel</li>
     * </ol>
     * 
    */
function ShowSettings() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(homePageSettingsSchema)
    });

    const { register: registerGoogleAnalytics, handleSubmit: handleSubmitGoogleAnalytics, formState: { errors: errorsGoogleAnalytics } } = useForm({
        resolver: yupResolver(googleAnalyticsSchema)
    });

    const { register: registerFacebookPixel, handleSubmit: handleSubmitFacebookPixel, formState: { errors: errorsFacebookPixel } } = useForm({
        resolver: yupResolver(facebookPixelSchema)
    });

    const [homePageSettings, setHomePageSettings] = useState({
        title: '',
        metaKeywords: '',
        metaDescription: ''
    });

    const [googleAnalytics, setGoogleAnalytics] = useState({
        googleAnalytics: ''
    });

    const [facebookPixel, setFacebookPixel] = useState({
        facebookPixel: ''
    });




    useEffect(() => {
        // load the home page adjustable values [title, metaKeywords, metaDescription]
        const fetchdata = async () => {
            let result = await SettingsController.getHomePageSettings();
            setHomePageSettings(result);
        }
        fetchdata();
    }, []);


    const homePageSettingsOnSubmit = async (data) => {
        const homepageTitleSetting = {
            key: 'homepageTitle',
            value: data.title
        }
        let result = await SettingsController.updateSetting(homepageTitleSetting);
        if (result.message === "Success") {
            alert('Home Page settings saved');
            setHomePageSettings(data);
        } else {
            alert('Error saving Home Page settings');
            alert(result.message);
        }
    }

    const googleAnalyticsOnSubmit = (data) => {
        alert('Google Analytics code saved');
        console.log(data);
        setGoogleAnalytics(data);
    }

    const facebookPixelOnSubmit = (data) => {
        alert('Facebook Pixel code saved');
        console.log(data);
        setFacebookPixel(data);
    }



    return (
        <div className='container-fluid bg-white m-2 p-2 rounded'>
            <h1>Settings</h1>
            <p>Settings page</p>
            {/* Settings specific for HomePage, like title, meta keyword and descriptions */}
            <div className='container bg-light border border-secondary p-2'>
                <div className='row'>
                    <h3>Home page settings</h3>
                    <form onSubmit={handleSubmit(homePageSettingsOnSubmit)}>
                        <div className='form-group'>
                            <label htmlFor='homepageTitle'>Title</label>
                            <input type='text' id='homepageTitle' name='homepageTitle' className='form-control' {...register('title')} defaultValue={homePageSettings.title} />
                            <p className='text-danger'>{errors.title?.message}</p>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='metaKeywords'>Meta Keywords</label>
                            <input type='text' id='metaKeywords' className='form-control' {...register('metaKeywords')} defaultValue={homePageSettings.metaKeywords} />
                            <p className='text-danger'>{errors.metaKeywords?.message}</p>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='metaDescription'>Meta Description</label>
                            <textarea id='metaDescription' className='form-control' {...register('metaDescription')} defaultValue={homePageSettings.metaDescription}></textarea>
                            <p className='text-danger'>{errors.metaDescription?.message}</p>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button type='submit' className='col-2 btn btn-primary'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Google Analytics code */}
            <div className='container bg-light border border-secondary p-2 mt-2'>
                <div className='row'>
                    <h3>Google Analytics</h3>
                    <p>Google Analytics code</p>
                </div>
                <div className='row'>
                    <form onSubmit={handleSubmitGoogleAnalytics(googleAnalyticsOnSubmit)}>
                        <div className='form-group'>
                            <label htmlFor='googleAnalytics'>Google Analytics Code</label>
                            <textarea id='googleAnalytics' className='form-control' {...registerGoogleAnalytics('googleAnalytics')} defaultValue={googleAnalytics.googleAnalytics}></textarea>
                            <p className='text-danger'>{errorsGoogleAnalytics.googleAnalytics?.message}</p>
                        </div>
                        <div className='d-flex justify-content-end my-2'>
                            <button type='submit' className='col-2 btn btn-primary'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Facebook Pixel code */}
            <div className='container bg-light border border-secondary p-2 mt-2'>
                <div className='row'>
                    <h3>Facebook Pixel</h3>
                    <p>Facebook Pixel code</p>
                </div>
                <div className='row'>
                    <form onSubmit={handleSubmitFacebookPixel(facebookPixelOnSubmit)}>
                        <div className='form-group'>
                            <label htmlFor='facebookPixel'>Facebook Pixel Code</label>
                            <textarea id='facebookPixel' className='form-control' {...registerFacebookPixel('facebookPixel')} defaultValue={facebookPixel.facebookPixel}></textarea>
                            <p className='text-danger'>{errorsFacebookPixel.facebookPixel?.message}</p>
                        </div>
                        <div className='d-flex justify-content-end my-2'>
                            <button type='submit' className='col-2 btn btn-primary'>Save</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default ShowSettings;