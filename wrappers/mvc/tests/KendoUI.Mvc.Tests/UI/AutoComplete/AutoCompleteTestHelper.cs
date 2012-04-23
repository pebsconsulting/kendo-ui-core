﻿namespace KendoUI.Mvc.UI.Tests
{
    using Moq;
    using System.Web.Mvc;
    using KendoUI.Mvc.Infrastructure;
    using System.IO;
    using System.Web.UI;
    using System.Web;
    using System.Collections.Generic;

    public static class AutoCompleteTestHelper
    {
        public static Mock<INavigationItemAuthorization> authorization;
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;
        public static UrlGenerator urlGenerator;

        public static ViewContext viewContext;
        public static ViewDataDictionary viewDataDinctionary;
#if MVC1
        public static Mock<IDictionary<string, ValueProviderResult>> valueProvider;
#endif
#if MVC2 || MVC3
        public static Mock<IValueProvider> valueProvider;
#endif

        public static AutoComplete CreateAutocomplete()
        {

            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            urlGenerator = new UrlGenerator();
            authorization = new Mock<INavigationItemAuthorization>();

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();

            var viewDataDinctionary = new ViewDataDictionary();

            viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

            // needed for testing serialization
            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

#if MVC1
            valueProvider = new Mock<IDictionary<string, ValueProviderResult>>();
#endif
#if MVC2 || MVC3
            valueProvider = new Mock<IValueProvider>();
#endif

            Controller controller = new ControllerTestDouble(new Dictionary<string, ValueProviderResult>(), viewDataContainer.Object.ViewData);
            controller.ValueProvider = valueProvider.Object;
            ControllerContext controllerContext = new ControllerContext(TestHelper.CreateRequestContext(), controller);

            viewContext = new ViewContext(controllerContext, new Mock<IView>().Object, new ViewDataDictionary(), new TempDataDictionary()
            #if MVC2 || MVC3
            , TextWriter.Null
            #endif
            );

            viewContext.ViewData = viewDataDinctionary;

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);

            AutoComplete Autocomplete = new AutoComplete(viewContext, clientSideObjectWriterFactory.Object, urlGenerator);

            return Autocomplete;
        }
    }
}
