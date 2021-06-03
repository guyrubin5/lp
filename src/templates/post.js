import { graphql } from 'gatsby'
import { React, Component, Image, Helmet } from 'x'

import Layout from '../layouts/main'
import Seo from '../components/seo'
import Blocks from '../components/blocks'

/*
const YOAST = {
  yoast_wpseo_title: "Custom Title",
  yoast_wpseo_metadesc: "So meta.",
  yoast_wpseo_canonical: "http://learningpeople.inno/uk/all-the-things/",
  yoast_wpseo_robots: {
    index: "index",
      follow: "follow",
      other: []
  },
  yoast_wpseo_og_title: "Test Facebook",
  yoast_wpseo_og_description: "Facebook description",
  yoast_wpseo_og_image: {
    id: 6165,
    url: "http://learningpeople.localhost:8080/wp-content/uploads/2020/10/studentcare.jpg",
    type: "image"
  },
  yoast_wpseo_twitter_title: "Twitter title",
  yoast_wpseo_twitter_description: "Twitter description",
  yoast_wpseo_twitter_image: {
    id: 6153,
    url: "http://learningpeople.localhost:8080/wp-content/uploads/2020/10/Coding-professional.jpg",
    type: "image"
  }

  ql: `
  # yoast_wpseo_title
  # yoast_wpseo_metadesc
  # yoast_wpseo_canonical
  # yoast_wpseo_robots {
  #   index
  #   follow
  #   other
  # },
  # yoast_wpseo_og_title
  # yoast_wpseo_og_description
  # yoast_wpseo_og_image {
  # },
  # yoast_wpseo_twitter_title
  # yoast_wpseo_twitter_description
  # yoast_wpseo_twitter_image {
  # }

  `
}
*/

export const query = graphql`
  query MainQuery($id: Int!, $locale: String!) {
    post: wordpressInnoThings(wordpress_id: { eq: $id }) {
      ...Post
    }

    site: site {
      siteMetadata {
        title
        domain
        protocol
        url
      }
    }

    metaData: wordpressSiteMetadata {
      url
      home
    }

    headerMenu: allWordpressWpApiMenusMenus(
      filter: {
        type: { in: ["primary", "secondary", "top"] }
        language: { code: { eq: $locale } }
      }
    ) {
      menus: edges {
        menu: node {
          id
          name
          slug
          type
          items {
            id: wordpress_id
            order
            megaMenu: mega_menu
            secondary
            title
            url
            object_slug
            items: wordpress_children {
              id: wordpress_id
              order
              title
              url
              object_slug
              items: wordpress_children {
                id: wordpress_id
                order
                title
                url
                object_slug
              }
            }
          }
        }
      }
    }

    footerMenu: allWordpressWpApiMenusMenus(
      filter: { type: { in: ["footer"] }, language: { code: { eq: $locale } } }
    ) {
      menus: edges {
        menu: node {
          id
          name
          name
          slug
          items {
            title
            url
            items: wordpress_children {
              title
              url
            }
          }
        }
      }
    }

    global: allWordpressInnoThings(
      filter: {
        layout: { eq: "global-data" }
        language: { code: { eq: $locale } }
      }
    ) {
      edges {
        node {
          layout
          language {
            code
            hreflang
            currency
            prefix
          }
          acf {
            primaryPhoneNumber: primary_phone_number
            secondaryPhoneNumber: secondary_phone_number

            cookieText: cookie_text
            googleTagManagerId: google_tag_manager_id
            zohoFormId: zoho_form_id
            zohoSalesIq: zoho_sales_iq
            zohoExtraFormField: zoho_extra_form_field
            thankYouPageUrl: thank_you_page_url

            defaultFacebookImage: default_facebook_image {
              url: source_url
            }

            stringPages: string_pages
            stringNews: string_news
            stringNoResults: string_no_results
            stringLoading: string_loading

            stringWhyJoinUs: string_why_join_us
            stringCourses: string_courses
            stringCourse: string_course
            stringSeeMore: string_see_more
            stringReadMoreHere: string_read_more_here
            stringTrustedBy: string_trusted_by
            stringGetInTouch: string_get_in_touch
            stringSearch: string_search
            stringSearchTerm: string_search_term
            stringFindOutMore: string_find_out_more
            stringOurStudentsWork: string_our_students_work
            stringAccceptedByAndPartneredWith: string_accredited_by_and_partnered_with
            stringTraineesTrustedBy: string_trainees_trusted_by

            contactEmail: contact_email
            contactSubmit: contact_submit
            contactLastName: contact_last_name
            contactFirstName: contact_first_name
            contactMobileNumber: contact_mobile_number
            contactLandlineNumber: contact_landline_number
            contactPreferredNumber: contact_preferred_number
            contactFundedByCompany: contact_funded_by_company
            contactInvalidEmailMessage: contact_invalid_email_message
            contactRequiredFieldMessage: contact_required_field_message
            contactCharacterCheckMessage: contact_character_check_message
            contactIncAreaAndCountryCode: contact_inc_area_and_country_code
            contactInvalidPhoneNumber: contact_invalid_phone_number
            contactNewCareer: contact_new_career
            contactAffectedByCovid: contact_affected_by_covid
            contactBetterJobSecurity: contact_better_job_security
            contactFurloughed: contact_furloughed
            contactEnhanceSkills: contact_enhance_skills
            contactTechnologyRole: contact_technology_role
            contactOptin1: contact_optin_1
            contactOptin1Required: contact_optin_1_required
            contactOptin2: contact_optin_2
            contactComment: contact_comment
            contactSelectAllThatApply: contact_select_all_that_apply
            contactBusinessEnquiry: contact_business_enquiry
            contactBusinessEnquiryYes: contact_business_enquiry_yes
            contactBusinessEnquiryNo: contact_business_enquiry_no
            contactPopupTitle: contact_popup_title

            siHigh: si_high
            siYouCanEarn: si_you_can_earn
            siAverageSalary: si_average_salary
            siEarnAnAverage: si_earn_an_average
            siSalaryIndicator: si_salary_indicator

            wjuTitle: wju_title
            wjuCtaUrl: wju_cta_url
            wjuCtaLabel: wju_cta_label
            wjuItems: wju_items {
              item: wju_item
            }

            footerInformationHeader: footer_information_header
            footerInformation: footer_information
            footerSocialHeader: footer_social_header
            footerTwitterUrl: footer_twitter_url
            footerFacebookUrl: footer_facebook_url
            footerLinkedinUrl: footer_linkedin_url
            footerInstagramUrl: footer_instagram_url
            footerYoutubeUrl: footer_youtube_url
            footerSecondaryLinks: footer_secondary_links {
              label: footer_secondary_link_label
              url: footer_secondary_link_url
            }
            footerRegulationItems: footer_regulation_items {
              item: footer_regulation_item
            }

            hubspotProxyUrl: hubspot_proxy_url
          }
        }
      }
    }
  }

  ### Post Fragments

  fragment Post on wordpress__inno_things {
    id: wordpress_id
    uuid: id
    type
    layout
    date
    slug
    title
    link
    content
    language {
      code
      hreflang
      currency
    }
    alternate {
      au {
        id: translation_id
        hreflang
      }
      en {
        id: translation_id
        hreflang
      }
    }

    yoast: yoast_meta {
      title: yoast_wpseo_title
      metaDescription: yoast_wpseo_metadesc
      robots: yoast_wpseo_robots {
        index
        follow
      }

      canonical: yoast_wpseo_canonical

      yoast_wpseo_og_title
      yoast_wpseo_og_description
      yoast_wpseo_og_image {
        type
        url{
          file: localFile {
            sharp: childImageSharp {
              fixed(width: 1200, quality: 80) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }

      #   url{
      #   file: localFile {
      #     sharp: childImageSharp {
      #       fluid(maxWidth: 1200, quality: 80) {
      #         ...GatsbyImageSharpFluid_withWebp
      #       }
      #     }
      #   }
      # }
      # }

      yoast_wpseo_twitter_title
      yoast_wpseo_twitter_description
      yoast_wpseo_twitter_image {
        type
        url{
          file: localFile {
            sharp: childImageSharp {
              fixed(width: 1200, quality: 80) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }

      #   url{
      #   file: localFile {
      #     sharp: childImageSharp {
      #       fluid(maxWidth: 1200, quality: 80) {
      #         ...GatsbyImageSharpFluid_withWebp
      #       }
      #     }
      #   }
      # }
      # }
    }

    acf {
      # Page
      pageLayout: page_layout

      # Zoho
      zohoFormId: offer_zoho_form_id
      zohoSalesIq: offer_zoho_sales_iq

      # Accreditor
      accreditorTitle: accreditor_title
      accreditorCategory: accreditor_category {
        wordpress_id
      }
      accreditorSubtitle: accreditor_subtitle
      accreditorThumbnail: accreditor_thumbnail {
        file: localFile {
          sharp: childImageSharp {
            fixed(width: 320, quality: 80) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }

      # Structured Content
      structuredContentTitle: structured_content_title
      structuredContentDescription: structured_content_description
      structuredContentProviderUrl: structured_content_provider_url
      structuredContentProviderName: structured_content_provider_name

      blocks: blocks_gatsby {
        __typename
        ... on WordPressAcf_centered_image_text_block {
          ...CenteredImageTextBlock
        }
        ... on WordPressAcf_refer_form {
          ...ReferForm
        }
        ... on WordPressAcf_numbered_list {
          ...NumberedList
        }
        ... on WordPressAcf_grey_header {
          ...GreyHeader
        }
        ... on WordPressAcf_generic_block {
          ...GenericBlock
        }
        ... on WordPressAcf_custom_generic_block {
          ...CustomGenericBlock
        }
        ... on WordPressAcf_unordered_list {
          ...UnorderedList
        }
        ... on WordPressAcf_hero_header {
          ...HeroHeader
        }
        ... on WordPressAcf_feature_list {
          ...FeatureList
        }
        ... on WordPressAcf_feature_list_image_block {
          ...FeatureListImage
        }
        ... on WordPressAcf_feature_list_video_block {
          ...FeatureListVideo
        }
        ... on WordPressAcf_icon_row {
          ...IconRow
        }
        ... on WordPressAcf_icon_grid {
          ...IconGrid
        }
        ... on WordPressAcf_course_categories {
          ...CourseCategories
        }
        ... on WordPressAcf_two_column_video_block {
          ...TwoColumnVideoBlock
        }
        ... on WordPressAcf_image_block_repeater {
          ...ImageBlockRepeater
        }
        ... on WordPressAcf_faq_block {
          ...FAQBlock
        }
        ... on WordPressAcf_tab_block {
          ...TabBlock
        }
        ... on WordPressAcf_managers {
          ...Managers
        }
        ... on WordPressAcf_contact {
          ...Contact
        }
        ... on WordPressAcf_videos {
          ...Videos
        }
        ... on WordPressAcf_generic_content {
          ...GenericContent
        }
        ... on WordPressAcf_related_courses {
          ...RelatedCourses
        }
        ... on WordPressAcf_video_headline {
          ...VideoHeadline
        }
        ... on WordPressAcf_map {
          ...Map
        }
        ... on WordPressAcf_all_subitems {
          ...AllSubitems
        }
        ... on WordPressAcf_testimonials {
          ...Testimonials
        }
        ... on WordPressAcf_salary_indicator {
          ...SalaryIndicator
        }
        ... on WordPressAcf_404_block {
          ...FourOFourBlock
        }
        ... on WordPressAcf_course_collection {
          ...CourseCollection
        }
        ... on WordPressAcf_generic_item_grid {
          title: generic_item_grid_title
          titleElement: generic_item_grid_title_element_select
          items: generic_item_grid_items {
            title: generic_item_grid_item_title
            summary: generic_item_grid_item_summary
            ctaLabel: generic_item_grid_item_cta_label
            ctaUrl: generic_item_grid_item_cta_url
            image: generic_item_grid_item_image {
              file: localFile {
                sharp: childImageSharp {
                  fixed(width: 364, quality: 80) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
          }
        }
        ... on WordPressAcf_offer_icon_row_block {
          id
          text: offer_icon_row_text
          icons: offer_icon_row_icons {
            symbol: icon
            title: offer_icon_row_icon_title
            subtitle: offer_icon_row_icon_subtitle
          }
        }
        ... on WordPressAcf_offer_text_block {
          id
          title: offer_text_title
          titleElement: offer_text_title_element_select
          subtitle: offer_text_subtitle
          subtitleElement: offer_text_subtitle_element_select
          text: offer_text_text
          logo: offer_text_image {
            file: localFile {
              sharp: childImageSharp {
                fixed(width: 185, quality: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          background: offer_text_background_image {
            url: source_url
            file: localFile {
              sharp: childImageSharp {
                fluid(maxWidth: 2500, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        ... on WordPressAcf_offer_testimonial_block {
          id
          title: offer_testimonial_title
          titleElement: offer_testimonial_title_element_select
          background: offer_testimonial_background_image {
            url: source_url
            file: localFile {
              sharp: childImageSharp {
                fluid(maxWidth: 2500, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          selected: offer_testimonial_selected {
            acf {
              quote: testimonial_quote
              person: testimonial_person_name
              image: testimonial_person_image {
                url: source_url
                file: localFile {
                  sharp: childImageSharp {
                    fluid(maxWidth: 2500, quality: 80) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
        ... on WordPressAcf_offer_feature_list_block {
          id
          title: offer_feature_list_title
          titleElement: offer_feature_list_title_element_select
          items: offer_feature_list_items {
            text: offer_feature_list_item_text
          }
          background: offer_feature_list_background_image {
            url: source_url
            file: localFile {
              sharp: childImageSharp {
                fluid(maxWidth: 2500, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        ... on WordPressAcf_latest_news {
          ...LatestNews
        }
        ... on WordPressAcf_career_path {
          careerPath: career_path
          title: career_path_title
          titleElement: career_path_title_element_select
          intro: career_path_intro
          outro: career_path_outro
          ctaLabel: career_path_cta_label
          ctaUrl: career_path_cta_url
        }
        ... on WordPressAcf_knoma_button {
          options {
            url
            courseID: course_id
            courseName: course_name
            totalCost: total_cost
            courseStartDate: course_start_date
            lengthOfCourseDays: length_of_course_days
            lengthOfCourseWeeks: length_of_course_weeks
            campusLocation: campus_location
            timeCommitment: time_commitment
            courseDescription: course_description
          }
        }
        #         ... on WordPressAcf_career
      }
    }
  }

  ### Menu Fragments

  ### Block fragments

  fragment ReferForm on WordPressAcf_refer_form {
    id
    title: refer_form_title
    firstnameLabel: refer_form_firstname_label
    lastnameLabel: refer_form_lastname_label
    emailLabel: refer_form_email_label
    submitLabel: refer_form_submit_label
    redirectUrl: refer_form_redirect_url
  }

  fragment NumberedList on WordPressAcf_numbered_list {
    id
    title: numbered_list_title
    titleElement: numbered_list_title_element_select
    numberedItems: numbered_list_items {
      icon: icon
      hideIcon: numbered_list_item_hide_icon
      content: numbered_list_item_content
    }
    content: numbered_list_content
  }

  fragment GreyHeader on WordPressAcf_grey_header {
    id
    title: grey_header_title
    titleElement: grey_header_title_element_select
    subtitle: grey_header_subtitle
    icon: icon
    ctaLabel: grey_header_cta_label
    ctaUrl: grey_header_cta_url
    ctaMobileOnly: grey_header_cta_mobile_only
  }

  fragment UnorderedList on WordPressAcf_unordered_list {
    id
    listItems: unordered_list_items {
      listItem: unordered_list_item
    }
  }

  fragment TabBlock on WordPressAcf_tab_block {
    id
    tabOneLabel: tab_1_label
    tabOneTitle: tab_1_title
    tabOneTitleElement: tab_1_title_element_select
    tabOneSubtitle: tab_1_subtitle
    tabOneSubtitleElement: tab_1_subtitle_element_select
    tabOneText: tab_1_text
    tabOneCtaLabel: tab_1_cta_label
    tabOneCtaUrl: tab_1_cta_url
    tabOneItems: tab_1_feature_list_items {
      title: tab_1_feature_list_item_title
      icon: tab_1_feature_list_item_icon
    }
    tabTwoLabel: tab_2_label
    tabTwoTitle: tab_2_title
    tabTwoTitleElement: tab_2_title_element_select
    tabTwoSubtitle: tab_2_subtitle
    tabTwoSubtitleElement: tab_2_subtitle_element_select
    tabTwoText: tab_2_text
    tabTwoCtaLabel: tab_1_cta_label
    tabTwoCtaUrl: tab_1_cta_url
    tabTwoItems: tab_2_feature_list_items {
      title: tab_2_feature_list_item_title
      icon: tab_2_feature_list_item_icon
    }
    tabThreeLabel: tab_3_label
    tabThreeTitle: tab_3_title
    tabThreeTitleElement: tab_3_title_element_select
    tabThreeSubtitle: tab_3_subtitle
    tabThreeSubtitleElement: tab_3_subtitle_element_select
    tabThreeText: tab_3_text
    tabThreeCtaLabel: tab_1_cta_label
    tabThreeCtaUrl: tab_1_cta_url
    tabThreeItems: tab_3_feature_list_items {
      title: tab_3_feature_list_item_title
      icon: tab_3_feature_list_item_icon
    }
  }

  fragment CustomGenericBlock on WordPressAcf_custom_generic_block {
    id
    pretitle: generic_block_pretitle
    title: generic_block_title
    titleElement: generic_block_title_element_select
    subtitle: generic_block_subtitle
    subtitleElement: generic_block_subtitle_element_select
    ctaLabel: generic_block_cta_label
    ctaUrl: generic_block_cta_url
    style: generic_block_style
    backgroundImage: generic_block_background_image {
      #      url: source_url
      file: localFile {
        sharp: childImageSharp {
          fluid(maxWidth: 2500, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    align: generic_block_align
  }

  fragment GenericBlock on WordPressAcf_generic_block {
    id
    selected: generic_block_selected {
      acf {
        pretitle: generic_block_pretitle
        title: generic_block_title
        titleElement: generic_block_title_element {
          select
        }
        subtitle: generic_block_subtitle
        subtitleElement: generic_block_subtitle_element {
          select
        }
        ctaLabel: generic_block_cta_label
        ctaUrl: generic_block_cta_url
        style: generic_block_style
        backgroundImage: generic_block_background_image {
          url: source_url
          file: localFile {
            sharp: childImageSharp {
              fluid(maxWidth: 2500, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        align: generic_block_align
      }
    }
  }

  fragment HeroHeader on WordPressAcf_hero_header {
    id
    image: hero_image {
      file: localFile {
        sharp: childImageSharp {
          fluid(maxWidth: 2500, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    title: hero_title
    subtitle: hero_subtitle
    ctaLabel: hero_cta_label
    ctaUrl: hero_cta_url
    autoloop: hero_autoloop
    duration: hero_slide_duration
    slider: hero_slider {
      title: hero_slide_title
      subtitle: hero_slide_subtitle
      ctaLabel: hero_slide_cta_label
      ctaUrl: hero_slide_cta_url
    }
  }

  fragment FeatureList on WordPressAcf_feature_list {
    id
    title: feature_list_title
    titleElement: feature_list_title_element_select
    subtitle: feature_list_subtitle
    subtitleElement: feature_list_subtitle_element_select
    ctaLabel: feature_list_cta_label
    ctaUrl: feature_list_cta_url
    items: feature_list_items {
      title: feature_list_item_title
      icon: feature_list_item_icon
    }
  }

  fragment FeatureListImage on WordPressAcf_feature_list_image_block {
    id
    featureList: fli_feature_list {
      subtitle: feature_list_subtitle
      ctaLabel: feature_list_cta_label
      ctaUrl: feature_list_cta_url
      items: feature_list_items {
        title: feature_list_item_title
        icon: feature_list_item_icon
      }
    }
    image: fli_image {
      url: source_url
    }
  }

  fragment FeatureListVideo on WordPressAcf_feature_list_video_block {
    id
    featureList: flv_feature_list {
      subtitle: feature_list_subtitle
      ctaLabel: feature_list_cta_label
      ctaUrl: feature_list_cta_url
      items: feature_list_items {
        title: feature_list_item_title
        icon: feature_list_item_icon
      }
    }
    title: flv_title
    titleElement: flv_title_element_select
    video: flv_video {
      acf {
        headline: video_headline
        embed: video_url
        image: video_image {
          file: localFile {
            sharp: childImageSharp {
              fixed(width: 600, quality: 80) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
    videoSubtitle: flv_video_subtitle
  }

  fragment IconGrid on WordPressAcf_icon_grid {
    id
    title: icon_grid_title
    titleElement: icon_grid_title_element_select
    subtitle: icon_grid_subtitle
    subtitleElement: icon_grid_subtitle_element_select
    icons: icon_grid_icons {
      title: icon_grid_icon_title
      text: icon_grid_icon_text
      symbol: icon
    }
  }

  fragment IconRow on WordPressAcf_icon_row {
    id
    title: icon_row_title
    titleElement: icon_row_title_element_select
    subtitle: icon_row_subtitle
    subtitleElement: icon_row_subtitle_element_select
    icons: icon_row_icons {
      title: icon_row_icon_title
      symbol: icon
      subtitle: icon_row_icon_subtitle
    }
  }

  fragment CourseCategories on WordPressAcf_course_categories {
    id
    title: course_categories_title
    titleElement: course_categories_title_element_select
    backgroundImage: course_categories_background_image {
      url: source_url
      file: localFile {
        sharp: childImageSharp {
          fluid(maxWidth: 2500, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    categories: course_categories_selected {
      id: wordpress_id
      title: post_title
      slug: post_name
      acf {
        summary: course_category_summary
      }
      link
    }
    overview: course_categories_overview_link {
      link
    }
  }

  fragment FAQBlock on WordPressAcf_faq_block {
    id
    supportTitle: support_title
    support: support_questions {
      question: support_question
      answer: support_answer
    }
    financeTitle: finance_title
    finance: finance_questions {
      question: finance_question
      answer: finance_answer
    }
    otherTitle: other_title
    other: other_questions {
      question: other_question
      answer: other_answer
    }
  }

  fragment ImageBlockRepeater on WordPressAcf_image_block_repeater {
    id
    images: image_block {
      title: image_block_title
      titleElement: image_block_title_element_select
      subtitle: image_block_subtitle
      subtitleElement: image_block_subtitle_element_select
      image: image_block_image {
        url: source_url
        file: localFile {
          sharp: childImageSharp {
            fixed(width: 600, quality: 80) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
    ctaTitle: image_block_repeater_cta_title
    ctaLabel: image_block_repeater_cta_label
    ctaUrl: image_block_repeater_cta_url
  }

  fragment TwoColumnVideoBlock on WordPressAcf_two_column_video_block {
    id
    title: two_column_video_title
    titleElement: two_column_video_title_element_select
    pretitle: two_column_video_pretitle
    text: two_column_video_text
    ctaLabel: two_column_video_cta_label
    ctaUrl: two_column_video_cta_url
    video: two_column_video_video {
      acf {
        headline: video_headline
        embed: video_url
        image: video_image {
          file: localFile {
            sharp: childImageSharp {
              fixed(width: 600, quality: 80) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
    videoSubtitle: two_column_video_video_subtitle
    videoSide: two_column_video_video_side
  }

  fragment Contact on WordPressAcf_contact {
    title: contact_title
    titleElement: contact_title_element_select
    subtitle: contact_subtitle
  }

  fragment Videos on WordPressAcf_videos {
    videos {
      video {
        acf {
          headline: video_headline
          embed: video_url
          image: video_image {
            file: localFile {
              sharp: childImageSharp {
                fixed(width: 600, quality: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
  }

  fragment Managers on WordPressAcf_managers {
    id
    title: managers_title
    titleElement: managers_title_element_select
    managers {
      role: manager_role
      name: manager_name
      born: manager_born
      joined: manager_joined
      fact: manager_fact
      facebook: manager_facebook
      twitter: manager_twitter
      linkedin: manager_linkedin
      instagram: manager_instagram
      image: manager_image {
        url: source_url
        file: localFile {
          sharp: childImageSharp {
            fixed(width: 368, quality: 80) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }

  fragment RelatedCourses on WordPressAcf_related_courses {
    title: related_courses_title
    titleElement: related_courses_title_element_select
    courses: related_courses_selected {
      title: post_title
      link
      acf {
        image: course_image {
          url: source_url
          file: localFile {
            sharp: childImageSharp {
              fixed(width: 364, quality: 80) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
  }

  fragment CourseCollection on WordPressAcf_course_collection {
    title: course_collection_title
    titleElement: course_collection_title_element_select
    courses: course_collection_selected {
      title: post_title
      link
      acf {
        summary: course_summary
      }
    }
  }

  fragment GenericContent on WordPressAcf_generic_content {
    title: generic_content_title
    titleElement: generic_content_title_element_select
    content: generic_content
    align: generic_content_align
  }

  fragment VideoHeadline on WordPressAcf_video_headline {
    video: video_headline_video {
      acf {
        headline: video_headline
        embed: video_url
        image: video_image {
          file: localFile {
            sharp: childImageSharp {
              fixed(width: 1366, quality: 80) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
  }

  fragment Map on WordPressAcf_map {
    title: map_title
    titleElement: map_title_element_select
    subtitle: map_subtitle
    subtitleElement: map_subtitle_element_select
    phoneNumbers: map_phone_numbers
    lat: map_default_lat
    long: map_default_long
    zoom: map_default_zoom
    minZoom: map_minimal_zoom
    maxZoom: map_maximum_zoom
    markers: map_markers {
      title: map_marker_title
      description: map_marker_description
      lat: map_marker_lat
      long: map_marker_long
    }
    informationBlocks: map_information_blocks {
      title: map_information_block_title
      content: map_information_block_content
    }
  }

  fragment AllSubitems on WordPressAcf_all_subitems {
    title: asb_title
    titleElement: title_element_select
  }

  fragment Testimonials on WordPressAcf_testimonials {
    testimonials: testimonials_selected {
      id: wordpress_id
      acf {
        quote: testimonial_quote
        name: testimonial_person_name
        image: testimonial_person_image {
          file: localFile {
            sharp: childImageSharp {
              fluid(maxWidth: 200, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }

  fragment SalaryIndicator on WordPressAcf_salary_indicator {
    id
    title: salary_indicator_title
    titleElement: salary_indicator_title_element_select
    subtitle: salary_indicator_subtitle
    subtitleElement: salary_indicator_subtitle_element_select
    ctaLabel: salary_indicator_cta_label
    ctaUrl: salary_indicator_cta_url
    role1Name: role_1_name
    role1Salary: role_1_salary
    role2Name: role_2_name
    role2Salary: role_2_salary
  }

  fragment FourOFourBlock on WordPressAcf_404_block {
    id
    title: wordpress_404_title
    subtitle: wordpress_404_subtitle
    text: wordpress_404_text
    label: wordpress_404_cta_label
  }

  fragment LatestNews on WordPressAcf_latest_news {
    title: latest_news_title
    titleElement: latest_news_title_element_select
  }

  fragment CenteredImageTextBlock on WordPressAcf_centered_image_text_block {
    id
    title: citb_title
    titleElement: citb_title_element_select
    subtitle: citb_subtitle
    sectionTitle: citb_section_title
    quote: citb_quote
    image: citb_image {
      file: localFile {
        sharp: childImageSharp {
          fixed(width: 400, height: 650) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  }
`

const Post = (props) => {
  const post = props.data.post

  if (post.id === -1) return <p />

  const menus = props.data.headerMenu.menus
  const blocks = post.acf.blocks
  const globalData = props.data.global.edges[0].node.acf
  const baseUrl = props.data.metaData.url
  const siteUrl = props.data.metaData.home

  const siteTitle = props.data.site.siteMetadata.title
  const pageTitle = post.yoast.title ? post.yoast.title : post.title

  props.data.globalData = {
    baseUrl,
    siteUrl,
    language: props.data.global.edges[0].node.language,
    formatLink: (link) => link.replace(siteUrl, ''),
    ...globalData,
    primaryPhoneHref:
      'tel:' + globalData.primaryPhoneNumber.trim().replace(/\s/g, ''),
    secondaryPhoneHref:
      'tel:' + globalData.secondaryPhoneNumber.trim().replace(/\s/g, ''),
    siteTitle,
    pageTitle,
  }

  return (
    <Layout {...props} menus={menus}>
      <Seo {...props} />
      <Blocks
        post={post}
        extra={props.pageContext.extra}
        blocks={blocks}
        globalData={props.data.globalData}
      />
    </Layout>
  )
}

export default Post
