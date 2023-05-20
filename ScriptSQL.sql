USE [StudentManagement]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[AccountId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL,
	[RoleCode] [nvarchar](50) NULL,
	[Type] [int] NULL,
	[Status] [int] NULL,
	[Admin] [bit] NULL,
	[Active] [bit] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Class]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Class](
	[ClassId] [int] IDENTITY(1,1) NOT NULL,
	[ClassCode] [nvarchar](50) NULL,
	[ClassName] [nvarchar](50) NULL,
	[Room] [nvarchar](50) NULL,
	[Lession] [nvarchar](50) NULL,
	[Teacher] [nvarchar](max) NULL,
	[Slot] [int] NULL,
	[Descrip] [nvarchar](max) NULL,
	[SubjectId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ClassId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Genre]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genre](
	[GenreId] [int] IDENTITY(1,1) NOT NULL,
	[GenreCode] [nvarchar](50) NULL,
	[GenreName] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[GenreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Major]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Major](
	[MajorId] [int] IDENTITY(1,1) NOT NULL,
	[MajorCode] [nvarchar](50) NULL,
	[MajorName] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[MajorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PointType]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PointType](
	[PointTypeId] [int] IDENTITY(1,1) NOT NULL,
	[PointTypeCode] [nvarchar](50) NULL,
	[PointTypeName] [nvarchar](max) NULL,
	[Descrip] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[PointTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SchoolYear]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SchoolYear](
	[SchoolYearId] [int] IDENTITY(1,1) NOT NULL,
	[SchoolYearCode] [nvarchar](50) NULL,
	[SchoolYearName] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[SchoolYearId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Student]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Student](
	[StudentId] [int] IDENTITY(1,1) NOT NULL,
	[StudentCode] [nvarchar](50) NULL,
	[FullName] [nvarchar](50) NULL,
	[Age] [int] NULL,
	[GenreId] [int] NULL,
	[MajorId] [int] NULL,
	[SchoolYearId] [int] NULL,
	[Email] [nvarchar](50) NULL,
	[Phone] [nvarchar](50) NULL,
	[Address] [nvarchar](max) NULL,
	[Status] [int] NULL,
	[AdmisionDate] [datetime] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
	[Gender] [int] NULL,
	[Birth] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[StudentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StudentClass]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentClass](
	[StudentClassId] [int] IDENTITY(1,1) NOT NULL,
	[StudentId] [int] NULL,
	[ClassId] [int] NULL,
	[Status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[StudentClassId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StudentPoint]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentPoint](
	[StudentPointId] [int] IDENTITY(1,1) NOT NULL,
	[PointTypeId] [int] NULL,
	[Point] [float] NULL,
	[SubjectId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[StudentPointId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subject]    Script Date: 5/20/2023 4:05:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subject](
	[SubjectId] [int] IDENTITY(1,1) NOT NULL,
	[SubjectCode] [nvarchar](50) NULL,
	[SubjectName] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[SubjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Account] ON 
GO
INSERT [dbo].[Account] ([AccountId], [UserName], [Password], [RoleCode], [Type], [Status], [Admin], [Active], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (1, N'admin', N'123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Account] OFF
GO
SET IDENTITY_INSERT [dbo].[Class] ON 
GO
INSERT [dbo].[Class] ([ClassId], [ClassCode], [ClassName], [Room], [Lession], [Teacher], [Slot], [Descrip], [SubjectId], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (2, N'001', N'Lớp lý luận', N'T2004E', N'T3-4', N'TienNN', 20, N'Test', 2, CAST(N'2023-05-20T15:05:52.930' AS DateTime), CAST(N'2023-05-20T15:07:47.730' AS DateTime), NULL)
GO
SET IDENTITY_INSERT [dbo].[Class] OFF
GO
SET IDENTITY_INSERT [dbo].[Genre] ON 
GO
INSERT [dbo].[Genre] ([GenreId], [GenreCode], [GenreName]) VALUES (3, N'001', N'Chính quy')
GO
SET IDENTITY_INSERT [dbo].[Genre] OFF
GO
SET IDENTITY_INSERT [dbo].[Major] ON 
GO
INSERT [dbo].[Major] ([MajorId], [MajorCode], [MajorName]) VALUES (2, N'001', N'Toán')
GO
SET IDENTITY_INSERT [dbo].[Major] OFF
GO
SET IDENTITY_INSERT [dbo].[PointType] ON 
GO
INSERT [dbo].[PointType] ([PointTypeId], [PointTypeCode], [PointTypeName], [Descrip], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (3, N'001', N'Điểm miệng', NULL, CAST(N'2023-05-20T10:44:22.967' AS DateTime), CAST(N'2023-05-20T10:45:42.823' AS DateTime), NULL)
GO
INSERT [dbo].[PointType] ([PointTypeId], [PointTypeCode], [PointTypeName], [Descrip], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (5, N'002', N'Điểm 15 phút', NULL, CAST(N'2023-05-20T10:45:49.177' AS DateTime), NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[PointType] OFF
GO
SET IDENTITY_INSERT [dbo].[SchoolYear] ON 
GO
INSERT [dbo].[SchoolYear] ([SchoolYearId], [SchoolYearCode], [SchoolYearName]) VALUES (2, N'001', N'68')
GO
SET IDENTITY_INSERT [dbo].[SchoolYear] OFF
GO
SET IDENTITY_INSERT [dbo].[Student] ON 
GO
INSERT [dbo].[Student] ([StudentId], [StudentCode], [FullName], [Age], [GenreId], [MajorId], [SchoolYearId], [Email], [Phone], [Address], [Status], [AdmisionDate], [CreatedAt], [UpdatedAt], [DeletedAt], [Gender], [Birth]) VALUES (1, N'685101123', N'Nguyễn Ngọc Tiến', 23, 3, 2, 2, N'tienhdtl1234@gmail.com', N'0983020816', N'HN', 1, CAST(N'2023-05-10T00:00:00.000' AS DateTime), CAST(N'2023-05-20T14:30:08.987' AS DateTime), CAST(N'2023-05-20T16:02:51.700' AS DateTime), NULL, 0, CAST(N'2023-05-15T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[Student] ([StudentId], [StudentCode], [FullName], [Age], [GenreId], [MajorId], [SchoolYearId], [Email], [Phone], [Address], [Status], [AdmisionDate], [CreatedAt], [UpdatedAt], [DeletedAt], [Gender], [Birth]) VALUES (2, N'002', N'Test', 10, 3, 2, 2, N't@gmail.com', N'12321312', N'HN', 1, CAST(N'2023-05-16T00:00:00.000' AS DateTime), CAST(N'2023-05-20T16:03:13.820' AS DateTime), NULL, NULL, 1, CAST(N'2023-05-22T00:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Student] OFF
GO
SET IDENTITY_INSERT [dbo].[StudentClass] ON 
GO
INSERT [dbo].[StudentClass] ([StudentClassId], [StudentId], [ClassId], [Status]) VALUES (4, 1, 2, 1)
GO
SET IDENTITY_INSERT [dbo].[StudentClass] OFF
GO
SET IDENTITY_INSERT [dbo].[Subject] ON 
GO
INSERT [dbo].[Subject] ([SubjectId], [SubjectCode], [SubjectName], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (2, N'001', N'Lý luận 1', CAST(N'2023-05-20T10:56:32.180' AS DateTime), CAST(N'2023-05-20T10:56:51.737' AS DateTime), NULL)
GO
SET IDENTITY_INSERT [dbo].[Subject] OFF
GO
